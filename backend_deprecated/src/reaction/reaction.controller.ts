import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ReactionService } from './reaction.service';
import { CreateBookmarkDto } from './dto/create-bookmark.dto';
import { Bookmark, Reaction } from 'src/data-model';
import { ReactionPaginationDto } from './dto/reaction-pagination.dto';
import { PaginationResponse } from 'src/common/pagination/dtos/pagination-response.dto';
import { AuthorizationGuard } from 'src/authorization/authorization.guard';
import { BookmarkDto } from './dto/bookmark.dto';
import { CreateReactionDto } from './dto/create-reaction.dto';
import { ReactionType } from './reaction-type';
import { LikeDto } from './dto/like.dto';
import { AdlibReactionDto } from './dto/adlib-reaction.dto';
import { Request } from 'express';
import { AccountService } from 'src/account/account.service';
import { AccountNotFoundException } from 'src/account/exceptions/account-not-found.exception';

@Controller('v1/reaction')
export class ReactionController {
  constructor(
    private readonly reactionService: ReactionService,
    private readonly accountService: AccountService,
  ) {}

  @Get('bookmark/find')
  @UseGuards(AuthorizationGuard)
  findBookmark(
    @Query()
    bookmarkDto: BookmarkDto,
  ): Promise<Bookmark> {
    return this.reactionService.findBookmark(
      bookmarkDto.adlibId,
      bookmarkDto.accountId,
    );
  }

  @Get('adlib/reactions')
  async findReactionsFromAdlib(@Query() adlibReactionDto: AdlibReactionDto) {
    let accountWithReactions = null;

    if (adlibReactionDto.accountId) {
      const foundAccount = await this.accountService.findOneById(
        adlibReactionDto.accountId,
      );
      if (!foundAccount) {
        throw new AccountNotFoundException();
      }
      const foundReactions = await this.reactionService.findReactions(
        adlibReactionDto.adlibId,
        foundAccount.id,
      );
      accountWithReactions = {
        currentUser: foundAccount.id,
        reactions: foundReactions,
      };
    }
    const foundReactionCount =
      await this.reactionService.findReactionsFromAdlib(
        adlibReactionDto.adlibId,
      );

    return {
      currentUser: accountWithReactions?.currentUser ?? null,
      reactions: accountWithReactions?.reactions ?? null,
      adlibReactions: foundReactionCount,
    };
  }

  @Get('like/find')
  @UseGuards(AuthorizationGuard)
  findLike(@Query() likeDto: LikeDto): Promise<Reaction> {
    return this.reactionService.findLike(likeDto.adlibId, likeDto.accountId);
  }

  @Get('bookmark')
  @UseGuards(AuthorizationGuard)
  getBookmarks(
    @Query(
      new ValidationPipe({
        transform: true,
        transformOptions: { enableImplicitConversion: true },
        forbidNonWhitelisted: true,
      }),
    )
    reactionPaginationDto: ReactionPaginationDto,
  ): Promise<PaginationResponse<Bookmark>> {
    return this.reactionService.findBookmarksPageable(reactionPaginationDto);
  }

  @Post('like')
  @UseGuards(AuthorizationGuard)
  async likeAdlib(@Body() createReactionDto: CreateReactionDto) {
    const foundLike = await this.reactionService.findLike(
      createReactionDto.adlibId,
      createReactionDto.accountId,
    );
    if (foundLike) {
      foundLike.hasReacted = !foundLike.hasReacted;
      if (createReactionDto.reactionType) {
        foundLike.reactionType = createReactionDto.reactionType;
      }
      return this.reactionService.saveReaction(foundLike);
    }
    const reaction = new Reaction();
    reaction.accountId = createReactionDto.accountId;
    reaction.adlibId = createReactionDto.adlibId;
    reaction.hasReacted = true;
    reaction.reactionType = ReactionType.LIKE;
    return this.reactionService.saveReaction(reaction);
  }

  @UsePipes(new ValidationPipe({ transform: true }))
  @UseGuards(AuthorizationGuard)
  @Post('bookmark')
  async bookmarkAdlib(@Body() createBookmarkDto: CreateBookmarkDto) {
    const foundBookmark = await this.reactionService.findBookmark(
      createBookmarkDto.adlibId,
      createBookmarkDto.accountId,
    );
    if (foundBookmark) {
      foundBookmark.hasBookmarked = !foundBookmark.hasBookmarked;
      return this.reactionService.saveBookmark(foundBookmark);
    }
    const bookmarkToSave = new Bookmark();
    bookmarkToSave.accountId = createBookmarkDto.accountId;
    bookmarkToSave.adlibId = createBookmarkDto.adlibId;
    bookmarkToSave.hasBookmarked = true;
    return this.reactionService.saveBookmark(bookmarkToSave);
  }
}
