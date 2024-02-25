import { Module } from '@nestjs/common';
import { LobbyService } from './lobby.service';
import { LobbyController } from './lobby.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lobby, User } from 'src/data-model/entities';
import { LobbyGateway } from './lobby.gateway';
import { UserService } from 'src/user/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([Lobby, User])],
  controllers: [LobbyController],
  providers: [LobbyService, LobbyGateway, UserService],
})
export class LobbyModule {}
