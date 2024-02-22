import { Controller, Get, Query } from '@nestjs/common';
import { AccountService } from './account.service';
import { Account } from 'src/data-model/entities';
import { AccountNotFoundException } from './exceptions/account-not-found.exception';

@Controller('/v1/account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Get('find')
  async findAccountByUsername(
    @Query()
    { username },
  ): Promise<Account> {
    const foundAccount =
      await this.accountService.findAccountByUsername(username);
    if (!foundAccount) {
      throw new AccountNotFoundException();
    }
    return foundAccount;
  }

  @Get('find/sub')
  async findBySub(
    @Query()
    { sub },
  ): Promise<Account> {
    const foundAccount = await this.accountService.findAccountBySub(sub);
    if (!foundAccount) {
      throw new AccountNotFoundException();
    }
    return foundAccount;
  }
}
