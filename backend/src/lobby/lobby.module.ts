import { Module } from '@nestjs/common';
import { LobbyService } from './lobby.service';
import { LobbyController } from './lobby.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lobby, User } from 'src/data-model/entities';

@Module({
  imports: [TypeOrmModule.forFeature([Lobby, User])],
  controllers: [LobbyController],
  providers: [LobbyService],
})
export class LobbyModule {}
