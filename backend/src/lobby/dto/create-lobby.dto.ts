import { IsNumber } from 'class-validator';

export class CreateLobbyDto {
  @IsNumber()
  userId: number;
}
