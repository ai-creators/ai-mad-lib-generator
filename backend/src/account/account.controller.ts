import { Controller } from '@nestjs/common';
import { AccountService } from './account.service';

@Controller('/v1/account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}
}
