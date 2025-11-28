import { Module } from '@nestjs/common';
import { OrientationService } from './orientation. service';
import { OrientationController } from './orientation.controller';
import { QuizModule } from '../quiz/quiz.module';
import { ProfessionsModule } from '../professions/professions.module';

@Module({
  imports: [QuizModule, ProfessionsModule],
  controllers: [OrientationController],
  providers: [OrientationService],
})
export class OrientationModule {}
