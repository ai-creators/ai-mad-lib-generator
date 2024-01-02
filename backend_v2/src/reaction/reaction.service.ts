import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Bookmark } from 'src/data-model';
import { Repository } from 'typeorm';

@Injectable()
export class ReactionService {
  constructor(
    @InjectRepository(Bookmark)
    private readonly bookmarkRepository: Repository<Bookmark>,
  ) {}

  findOne(adlibId: string, accountId: string): Promise<Bookmark> {
    return this.bookmarkRepository.findOne({
      where: {
        adlibId,
        accountId,
      },
    });
  }

  saveBookmark(bookmark: Bookmark): Promise<Bookmark> {
    return this.bookmarkRepository.save(bookmark);
  }
}
