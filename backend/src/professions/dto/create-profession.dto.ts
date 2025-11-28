import { IsString, IsOptional, IsNumber, IsArray } from 'class-validator';

export class CreateProfessionDto {
  @IsString()
  titre: string;

  @IsString()
  description: string;

  @IsString()
  competencesRequises: string;

  @IsString()
  formations: string;

  @IsOptional()
  @IsNumber()
  salaireMin?: number;

  @IsOptional()
  @IsNumber()
  salaireMax?: number;

  @IsArray()
  @IsString({ each: true })
  secteurs: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  interets?: string[];

  @IsOptional()
  @IsString()
  videoUrl?: string;

  @IsString()
  createdBy: string;
}
