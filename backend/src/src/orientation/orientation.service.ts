import { Injectable } from '@nestjs/common';
import { QuizService } from '../quiz/quiz.service';
import { ProfessionsService } from '../professions/professions.service';

@Injectable()
export class OrientationService {
  constructor(
    private quizService: QuizService,
    private professionsService: ProfessionsService,
  ) {}

  async getOrientationMap(userId: string) {
    const latestResult = await this.quizService.getLatestResult(userId);
    
    if (!latestResult) {
      return {
        message: 'Aucun quiz complété',
        professions: [],
      };
    }

    const recommendedProfessions = await this. professionsService.findByInterets(
      latestResult.interetsDominants
    );

    return {
      interetsDominants: latestResult.interetsDominants,
      professions: recommendedProfessions. slice(0, 10),
      scores: latestResult.resultats,
    };
  }

  async getCareerPath(professionId: string, userId: string) {
    const profession = await this.professionsService.findOne(professionId);
    const latestResult = await this.quizService.getLatestResult(userId);

    let matchScore = 0;
    if (latestResult && profession.interets) {
      const commonInterests = profession.interets.filter(i => 
        latestResult.interetsDominants.includes(i)
      );
      matchScore = (commonInterests.length / profession. interets.length) * 100;
    }

    return {
      profession,
      matchScore: Math.round(matchScore),
      userInterests: latestResult?. interetsDominants || [],
    };
  }
}
