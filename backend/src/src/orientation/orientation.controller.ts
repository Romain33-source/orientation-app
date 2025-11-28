import { Controller, Get, Param, UseGuards, Request } from '@nestjs/common';
import { OrientationService } from './orientation.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('orientation')
@UseGuards(JwtAuthGuard)
export class OrientationController {
  constructor(private readonly orientationService: OrientationService) {}

  @Get('map')
  getOrientationMap(@Request() req) {
    return this.orientationService.getOrientationMap(req.user.id);
  }

  @Get('career-path/:id')
  getCareerPath(@Param('id') professionId: string, @Request() req) {
    return this.orientationService.getCareerPath(professionId, req.user.id);
  }
}
