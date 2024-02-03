import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateAccountDto {
  @IsString()
  @IsNotEmpty()
  sub: string;

  @IsString()
  @MaxLength(30)
  @MinLength(1)
  @IsNotEmpty()
  username: string;
}
