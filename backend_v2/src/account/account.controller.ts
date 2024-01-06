import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AccountService } from './account.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { Account } from 'src/data-model';
import { AuthorizationGuard } from 'src/authorization/authorization.guard';
import { AccountNotFoundException } from 'src/account/exceptions/account-not-found.exception';
import { UsernameDto } from './dto/username.dto';
import { AdlibService } from 'src/adlib/adlib.service';

@Controller('/v1/account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @UseGuards(AuthorizationGuard)
  @Get('is-account-setup')
  async isAccountSetup(@Query('sub') sub: string): Promise<boolean> {
    return (await this.accountService.findOneBySub(sub)) ? true : false;
  }

  @Get('find/username/:username')
  async getAccountProfile(@Param() usernameDto: UsernameDto): Promise<{
    account: Account;
    adlibs: number;
    responses: number;
  }> {
    const foundAccount = await this.accountService.findOneByUsername(
      usernameDto.username,
    );
    if (!foundAccount) {
      throw new AccountNotFoundException();
    }
    const adlibCount = await this.accountService.countAdlibsByUsername(
      usernameDto.username,
    );

    console.log(adlibCount);

    this.removePrivateProperties(foundAccount);
    return {
      account: foundAccount,
      adlibs: adlibCount,
      responses: 0,
    };
  }

  @Get('find')
  async findAccount(@Query('sub') sub: string): Promise<Account> {
    const foundAccount = await this.accountService.findOneBySub(sub);
    if (!foundAccount) {
      throw new AccountNotFoundException();
    }
    this.removePrivateProperties(foundAccount);
    return foundAccount;
  }

  @Post('create')
  async createAccount(
    @Body() createAccountDto: CreateAccountDto,
  ): Promise<Account> {
    const account = new Account();
    account.sub = createAccountDto.sub;
    account.username = createAccountDto.username;
    const createdAccount = await this.accountService.create(account);
    this.removePrivateProperties(createdAccount);
    return createdAccount;
  }

  private removePrivateProperties(account: Account): void {
    account.sub = null;
  }
}
