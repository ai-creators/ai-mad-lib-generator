import { HttpException, HttpStatus } from '@nestjs/common';
import { UserLabel } from '../labels/user.label';

export class UserNotFoundException extends HttpException {
  constructor() {
    super(UserLabel.USER_NOT_FOUND, HttpStatus.NOT_FOUND);
  }
}
