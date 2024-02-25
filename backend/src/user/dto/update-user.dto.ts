import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsNumber()
  userId: number;

  @IsString()
  @IsNotEmpty()
  guestName: string;
}
