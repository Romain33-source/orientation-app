import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Video } from './entities/video.entity';

@Injectable()
export class VideosService {
  constructor(
    @InjectRepository(Video)
    private videosRepository: Repository<Video>,
  ) {}

  async create(videoData: Partial<Video>): Promise<Video> {
    const video = this.videosRepository. create(videoData);
    return this.videosRepository.save(video);
  }

  async findAll(): Promise<Video[]> {
    return this.videosRepository.find();
  }

  async findOne(id: string): Promise<Video> {
    const video = await this.videosRepository.findOne({ where: { id } });
    if (!video) {
      throw new NotFoundException(`Video #${id} not found`);
    }
    
    // Incrémenter le compteur de vues
    video.viewCount++;
    await this.videosRepository.save(video);
    
    return video;
  }

  async findByProfession(professionId: string): Promise<Video[]> {
    return this. videosRepository.find({ where: { professionId } });
  }

  async remove(id: string): Promise<void> {
    await this.videosRepository.delete(id);
  }
}
