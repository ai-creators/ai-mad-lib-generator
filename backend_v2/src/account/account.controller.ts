import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AccountService } from './account.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { Account } from 'src/data-model';
import { AuthorizationGuard } from 'src/authorization/authorization.guard';
import { AccountNotFoundException } from 'src/account/exceptions/account-not-found.exception';
import { UsernameDto } from './dto/username.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { AccountIdDto } from './dto/account-id.dto';
import { AccountSubDto } from './dto/account-sub.dto';
import { IncorrectAccountOwnerException } from './exceptions/incorrect-account-owner.exception';

@Controller('/v1/account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Get('is-account-setup')
  @UseGuards(AuthorizationGuard)
  async isAccountSetup(@Query('sub') sub: string): Promise<boolean> {
    return (await this.accountService.findOneBySub(sub)) ? true : false;
  }

  @Get('find/username/:username')
  async getAccountProfile(@Param() usernameDto: UsernameDto): Promise<{
    account: Account;
    adlibs: number;
    responses: number;
    bookmarks: number;
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

    const responseCount =
      await this.accountService.countAdlibResponsesByUsername(
        usernameDto.username,
      );

    const bookmarkCunt = await this.accountService.countBookmarksByUsername(
      usernameDto.username,
    );

    this.removePrivateProperties(foundAccount);
    return {
      account: foundAccount,
      adlibs: adlibCount,
      responses: responseCount,
      bookmarks: bookmarkCunt,
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

  @Put(':accountId/update/rating')
  @UseGuards(AuthorizationGuard)
  async updateAccountRating(
    @Param() accountIdDto: AccountIdDto,
    @Query() accountSubDto: AccountSubDto,
    @Body() updateAccountDto: UpdateAccountDto,
  ): Promise<Account> {
    const foundAccount = await this.accountService.findOneById(
      accountIdDto.accountId,
    );
    if (!foundAccount) {
      throw new AccountNotFoundException();
    }
    if (foundAccount.sub !== accountSubDto.sub) {
      throw new IncorrectAccountOwnerException();
    }
    const updatedAccount = await this.accountService.updateContentRating(
      foundAccount,
      updateAccountDto.contentRating,
    );
    this.removePrivateProperties(updatedAccount);
    return updatedAccount;
  }
}
