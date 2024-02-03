import { Module } from '@nestjs/common';
import { ReactionService } from './reaction.service';
import { ReactionController } from './reaction.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account, Adlib, Bookmark, Reaction } from 'src/data-model';
import { AccountService } from 'src/account/account.service';
import { AdlibService } from 'src/adlib/adlib.service';

@Module({
  imports: [TypeOrmModule.forFeature([Adlib, Account, Bookmark, Reaction])],
  controllers: [ReactionController],
  providers: [ReactionService, AccountService, AdlibService],
})
export class ReactionModule {}
