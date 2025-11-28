import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Quiz } from './entities/quiz.entity';
import { QuizResult } from './entities/quiz-result.entity';
import { SubmitQuizDto } from './dto/submit-quiz.dto';

@Injectable()
export class QuizService {
  constructor(
    @InjectRepository(Quiz)
    private quizRepository: Repository<Quiz>,
    @InjectRepository(QuizResult)
    private quizResultRepository: Repository<QuizResult>,
  ) {}

  async findAll(): Promise<Quiz[]> {
    return this.quizRepository. find({ where: { isActive: true } });
  }

  async findOne(id: string): Promise<Quiz> {
    const quiz = await this.quizRepository.findOne({ where: { id } });
    if (!quiz) {
      throw new NotFoundException(`Quiz #${id} not found`);
    }
    return quiz;
  }

  async submitQuiz(submitQuizDto: SubmitQuizDto): Promise<QuizResult> {
    const quiz = await this.findOne(submitQuizDto.quizId);
    
    // Calcul des intérêts dominants
    const interetsScores: Record<string, number> = {};
    
    Object.entries(submitQuizDto. reponses).forEach(([questionId, reponse]) => {
      const question = quiz.questions.find(q => q.id === questionId);
      if (question && question.interet) {
        interetsScores[question.interet] = (interetsScores[question. interet] || 0) + (reponse as number);
      }
    });

    // Trier les intérêts par score
    const interetsDominants = Object.entries(interetsScores)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 3)
      .map(([interet]) => interet);

    const result = this.quizResultRepository.create({
      userId: submitQuizDto.userId,
      quizId: submitQuizDto.quizId,
      reponses: submitQuizDto. reponses,
      resultats: interetsScores,
      interetsDominants,
    });

    return this. quizResultRepository.save(result);
  }

  async getUserResults(userId: string): Promise<QuizResult[]> {
    return this.quizResultRepository.find({ where: { userId } });
  }

  async getLatestResult(userId: string): Promise<QuizResult | null> {
    return this.quizResultRepository. findOne({
      where: { userId },
      order: { createdAt: 'DESC' },
    });
  }

  async createQuiz(quizData: Partial<Quiz>): Promise<Quiz> {
    const quiz = this.quizRepository.create(quizData);
    return this. quizRepository.save(quiz);
  }
}
