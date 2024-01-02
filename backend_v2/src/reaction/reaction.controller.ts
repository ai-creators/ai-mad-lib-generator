import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ReactionService } from './reaction.service';
import { CreateBookmarkDto } from './dto/create-bookmark.dto';
import { Bookmark } from 'src/data-model';

@Controller('v1/reaction')
export class ReactionController {
  constructor(private readonly reactionService: ReactionService) {}

  @UsePipes(new ValidationPipe({ transform: true }))
  @Post('bookmark')
  async bookmarkAdlib(@Body() createBookmarkDto: CreateBookmarkDto) {
    const foundBookmark = await this.reactionService.findOne(
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
