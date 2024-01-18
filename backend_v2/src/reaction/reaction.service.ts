import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Bookmark, Reaction } from 'src/data-model';
import { DataSource, LessThan, Repository } from 'typeorm';
import { ReactionPaginationDto } from './dto/reaction-pagination.dto';
import { PaginationResponse } from 'src/common/pagination/dtos/pagination-response.dto';
import { Pagination } from 'src/common/pagination/pagination';
import { FeedTypes } from 'src/models/feed-type';

@Injectable()
export class ReactionService {
  constructor(
    @InjectRepository(Reaction)
    private reactionRepository: Repository<Reaction>,
    @InjectRepository(Bookmark)
    private bookmarkRepository: Repository<Bookmark>,
  ) {}

  findLike(adlibId: string, accountId: string): Promise<Reaction> {
    return this.reactionRepository.findOne({
      where: {
        adlibId,
        accountId,
      },
    });
  }

  saveReaction(reaction: Reaction): Promise<Reaction> {
    return this.reactionRepository.save(reaction);
  }

  findBookmark(adlibId: string, accountId: string): Promise<Bookmark> {
    console.log(adlibId, accountId);
    return this.bookmarkRepository.findOne({
      where: {
        adlibId,
        accountId,
      },
    });
  }

  findBookmarksPageable(
    reactionPaginationDto: ReactionPaginationDto,
  ): Promise<PaginationResponse<Bookmark>> {
    const where = {
      createdAt: LessThan(reactionPaginationDto.timestamp),
      accountId: reactionPaginationDto.accountId,
      hasBookmarked: true,
    };

    if (reactionPaginationDto.feedType === FeedTypes.FEATURED) {
      where['isFeatured'] = true;
    }

    return Pagination.paginate<Bookmark>(
      this.bookmarkRepository,
      reactionPaginationDto,
      {
        where,
        order: this.calculateOrder(reactionPaginationDto),
        relations: ['adlib'],
      },
    );
  }

  saveBookmark(bookmark: Bookmark): Promise<Bookmark> {
    return this.bookmarkRepository.save(bookmark);
  }

  private calculateOrder(reactionPaginationDto: ReactionPaginationDto): {
    createdAt: 'DESC' | 'ASC';
  } {
    const createdAt =
      reactionPaginationDto.feedType === FeedTypes.LATEST
        ? 'DESC'
        : reactionPaginationDto.feedType === FeedTypes.OLDEST
        ? 'ASC'
        : 'DESC';
    return {
      createdAt,
    };
  }
}
