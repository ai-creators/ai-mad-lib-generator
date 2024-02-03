import { IsNotEmpty, IsString } from 'class-validator';

export class AccountSubDto {
  @IsString()
  @IsNotEmpty()
  sub: string;
}
