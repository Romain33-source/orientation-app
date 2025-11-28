import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { ProfessionsService } from './professions.service';
import { CreateProfessionDto } from './dto/create-profession.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('professions')
export class ProfessionsController {
  constructor(private readonly professionsService: ProfessionsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createProfessionDto: CreateProfessionDto) {
    return this.professionsService.create(createProfessionDto);
  }

  @Get()
  findAll() {
    return this.professionsService.findAll();
  }

  @Get('search')
  search(@Query('q') query: string) {
    return this.professionsService.search(query);
  }

  @Get('recommandations')
  @UseGuards(JwtAuthGuard)
  getRecommandations(@Query('interets') interets: string) {
    const interetsArray = interets.split(',');
    return this.professionsService.findByInterets(interetsArray);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this. professionsService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateData: Partial<CreateProfessionDto>) {
    return this.professionsService.update(id, updateData);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this. professionsService.remove(id);
  }
}
