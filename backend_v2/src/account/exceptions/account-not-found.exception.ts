import { HttpException, HttpStatus } from '@nestjs/common';
import { AccountLabel } from '../labels/account.label';

export class AccountNotFoundException extends HttpException {
  constructor() {
    super(AccountLabel.ACCOUNT_DOES_NOT_EXIST, HttpStatus.NOT_FOUND);
  }
}
