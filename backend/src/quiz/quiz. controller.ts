import { Controller, Get, Post, Body, Param, UseGuards, Request } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { SubmitQuizDto } from './dto/submit-quiz.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('quiz')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @Get()
  findAll() {
    return this. quizService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.quizService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/submit')
  async submitQuiz(@Param('id') id: string, @Body() submitData: any, @Request() req) {
    const submitQuizDto: SubmitQuizDto = {
      quizId: id,
      userId: req.user.id,
      reponses: submitData.reponses,
    };
    return this.quizService.submitQuiz(submitQuizDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('results/me')
  getUserResults(@Request() req) {
    return this. quizService.getUserResults(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('results/latest')
  getLatestResult(@Request() req) {
    return this.quizService.getLatestResult(req.user. id);
  }
}
