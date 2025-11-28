import { IsString, IsObject } from 'class-validator';

export class SubmitQuizDto {
  @IsString()
  quizId: string;

  @IsString()
  userId: string;

  @IsObject()
  reponses: Record<string, any>;
}
