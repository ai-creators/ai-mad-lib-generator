import { PartialType } from '@nestjs/mapped-types';
import { CreateAccountDto } from './create-account.dto';
import { ContentRating } from 'src/data-model/models/ContentRating';

export class UpdateAccountDto extends PartialType(CreateAccountDto) {
  contentRating: ContentRating;
}
