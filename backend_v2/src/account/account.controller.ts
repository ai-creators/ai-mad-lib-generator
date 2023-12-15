import { Controller, Get, Query } from '@nestjs/common';
import { AccountService } from './account.service';

@Controller('/v1/account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Get('is-account-setup')
  async isAccountSetup(@Query('sub') sub: string): Promise<boolean> {
    return (await this.accountService.findOneBySub(sub)) ? true : false;
  }
}
