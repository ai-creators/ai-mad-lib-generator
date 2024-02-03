import { HttpException, HttpStatus } from '@nestjs/common';
import { AccountLabel } from '../labels/account.label';

export class IncorrectAccountOwnerException extends HttpException {
  constructor() {
    super(AccountLabel.INCORRECT_ACCOUNT_OWNER, HttpStatus.CONFLICT);
  }
}
