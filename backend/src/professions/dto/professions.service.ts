import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profession } from './entities/profession.entity';
import { CreateProfessionDto } from './dto/create-profession. dto';

@Injectable()
export class ProfessionsService {
  constructor(
    @InjectRepository(Profession)
    private professionsRepository: Repository<Profession>,
  ) {}

  async create(createProfessionDto: CreateProfessionDto): Promise<Profession> {
    const profession = this.professionsRepository.create(createProfessionDto);
    return this.professionsRepository.save(profession);
  }

  async findAll(): Promise<Profession[]> {
    return this. professionsRepository.find();
  }

  async findOne(id: string): Promise<Profession> {
    const profession = await this.professionsRepository.findOne({ where: { id } });
    if (!profession) {
      throw new NotFoundException(`Profession #${id} not found`);
    }
    
    // Incrémenter le compteur de vues
    profession.vuesCount++;
    await this.professionsRepository.save(profession);
    
    return profession;
  }

  async findByInterets(interets: string[]): Promise<Profession[]> {
    const professions = await this.findAll();
    
    // Algorithme de matching simple
    return professions
      .map(profession => {
        const matchCount = profession.interets?. filter(i => 
          interets.includes(i)
        ).length || 0;
        
        return { profession, matchCount };
      })
      .filter(({ matchCount }) => matchCount > 0)
      .sort((a, b) => b.matchCount - a.matchCount)
      .map(({ profession }) => profession);
  }

  async update(id: string, updateData: Partial<CreateProfessionDto>): Promise<Profession> {
    await this.professionsRepository.update(id, updateData);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.professionsRepository.delete(id);
  }

  async search(query: string): Promise<Profession[]> {
    return this.professionsRepository
      .createQueryBuilder('profession')
      .where('profession.titre ILIKE :query', { query: `%${query}%` })
      .orWhere('profession.description ILIKE :query', { query: `%${query}%` })
      .getMany();
  }
}
