import { Injectable } from '@nestjs/common';
import { Account } from '../data-model/entities/account.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Adlib, Bookmark } from 'src/data-model';
import { AdlibResponse } from 'src/data-model/entities/adlib-response.entity';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
    private dataSource: DataSource,
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

  findOneByUsername(username: string): Promise<Account | undefined> {
    return this.accountRepository.findOne({
      where: {
        username,
      },
    });
  }

  create(account: Account): Promise<Account> {
    return this.accountRepository.save(account);
  }

  countAdlibsByUsername(username: string): Promise<number> {
    return this.dataSource.getRepository(Adlib).count({
      where: {
        createdBy: {
          username,
        },
      },
    });
  }

  countAdlibResponsesByUsername(username: string): Promise<number> {
    return this.dataSource.getRepository(AdlibResponse).count({
      where: {
        createdBy: {
          username,
        },
      },
    });
  }

  countBookmarksByUsername(username: string): Promise<number> {
    return this.dataSource.getRepository(Bookmark).count({
      where: {
        account: {
          username,
        },
      },
    });
  }
}
