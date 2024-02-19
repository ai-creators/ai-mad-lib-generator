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
    const foundAccount: Account = await this.accountRepository.findOneByOrFail({
      username,
    });
    return this.filterSecureProperties(foundAccount);
  }

  filterSecureProperties(account: Account): Account {
    account.id = null;
    account.sub = null;
    return account;
  }
}
