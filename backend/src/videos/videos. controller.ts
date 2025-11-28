import { 
  Controller, 
  Get, 
  Post, 
  Param, 
  Delete, 
  UseGuards, 
  UseInterceptors, 
  UploadedFile,
  Request,
  Res,
  StreamableFile,
  BadRequestException
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { VideosService } from './videos.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { createReadStream } from 'fs';
import { join } from 'path';
import { Response } from 'express';

@Controller('videos')
export class VideosController {
  constructor(private readonly videosService: VideosService) {}

  @UseGuards(JwtAuthGuard)
  @Post('upload')
  @UseInterceptors(FileInterceptor('video', {
    storage: diskStorage({
      destination: './uploads/videos',
      filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, `${uniqueSuffix}-${file.originalname}`);
      },
    }),
    limits: { fileSize: 52428800 }, // 50MB
    fileFilter: (req, file, cb) => {
      if (! file.mimetype.startsWith('video/')) {
        return cb(new BadRequestException('Seuls les fichiers vidéo sont acceptés'), false);
      }
      cb(null, true);
    },
  }))
  async uploadVideo(
    @UploadedFile() file: Express.Multer.File,
    @Request() req,
    @Param() params: any,
  ) {
    const video = await this.videosService. create({
      titre: req.body.titre,
      description: req.body.description,
      fileName: file.filename,
      filePath: file.path,
      mimeType: file.mimetype,
      fileSize: file.size,
      professionId: req.body.professionId,
      uploadedBy: req.user.id,
    });

    return video;
  }

  @Get()
  findAll() {
    return this.videosService. findAll();
  }

  @Get('profession/:professionId')
  findByProfession(@Param('professionId') professionId: string) {
    return this. videosService.findByProfession(professionId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.videosService. findOne(id);
  }

  @Get(':id/stream')
  async streamVideo(@Param('id') id: string, @Res({ passthrough: true }) res: Response) {
    const video = await this. videosService.findOne(id);
    const file = createReadStream(join(process.cwd(), video.filePath));
    
    res.set({
      'Content-Type': video.mimeType,
      'Content-Disposition': `inline; filename="${video.fileName}"`,
    });

    return new StreamableFile(file);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.videosService.remove(id);
  }
}
