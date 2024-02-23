import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateLobbyDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  userId: number;
}
