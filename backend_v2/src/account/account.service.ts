import { Injectable } from '@nestjs/common';
import { Account } from '../data-model/entities/account.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
  ) {}

  findOneBySub(sub: string): Promise<Account | undefined> {
    return this.accountRepository.findOne({
      where: { sub },
    });
  }

  findOneById(id: string): Promise<Account | undefined> {
    return this.accountRepository.findOne({
      where: {
        id,
      },
    });
  }

  create(account: Account): Promise<Account> {
    return this.accountRepository.save(account);
  }
}
