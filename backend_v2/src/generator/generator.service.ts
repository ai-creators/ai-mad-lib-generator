import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Account, Adlib } from 'src/data-model';
import { Repository } from 'typeorm';

@Injectable()
export class GeneratorService {
  constructor(
    @InjectRepository(Adlib)
    private readonly adlibRepository: Repository<Adlib>,
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
  ) {}

  saveAdlib(adlib: Adlib): Promise<Adlib> {
    return this.adlibRepository.save(adlib);
  }

  findAccountById(userId: number): Promise<Account> {
    return this.accountRepository.findOne({
      where: {
        id: userId,
      },
    });
  }
}
