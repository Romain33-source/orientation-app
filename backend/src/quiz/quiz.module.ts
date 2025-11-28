import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuizService } from './quiz.service';
import { QuizController } from './quiz. controller';
import { Quiz } from './entities/quiz.entity';
import { QuizResult } from './entities/quiz-result.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Quiz, QuizResult])],
  controllers: [QuizController],
  providers: [QuizService],
  exports: [QuizService],
})
export class QuizModule {}
