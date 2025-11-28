import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity('quiz_results')
export class QuizResult {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  userId: string;

  @Column({ type: 'uuid' })
  quizId: string;

  @Column('json')
  reponses: any;

  @Column('json')
  resultats: any;

  @Column('simple-array')
  interetsDominants: string[];

  @Column('simple-array', { nullable: true })
  metiersRecommandes?: string[];

  @CreateDateColumn()
  createdAt: Date;
}
