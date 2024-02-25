import { IsNumber, IsOptional } from 'class-validator';

export class CreateLobbyDto {
  @IsNumber()
  @IsOptional()
  userId: number;
}
