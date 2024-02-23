import { HttpException, HttpStatus } from '@nestjs/common';
import { CategoryLabel } from '../labels/category.label';

export class CategoryNotFoundException extends HttpException {
  constructor() {
    super(CategoryLabel.CATEGORY_NOT_FOUND, HttpStatus.NOT_FOUND);
  }
}
