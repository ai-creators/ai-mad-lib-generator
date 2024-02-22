import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Account } from 'src/data-model/entities';
import { Repository } from 'typeorm';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
  ) {}

  async findAccountByUsername(username: string) {
    if (!username) {
      return null;
    }
    const foundAccount: Account = await this.accountRepository.findOneBy({
      username,
    });
    return foundAccount ? this.filterSecureProperties(foundAccount) : null;
  }

  async findAccountBySub(sub: string) {
    if (!sub) {
      return null;
    }
    const foundAccount: Account = await this.accountRepository.findOneBy({
      sub,
    });
    return foundAccount ? this.filterSecureProperties(foundAccount) : null;
  }

  filterSecureProperties(account: Account): Account {
    account.id = null;
    account.sub = null;
    return account;
  }
}
