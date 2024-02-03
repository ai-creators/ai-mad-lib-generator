import { IsNotEmpty, IsString } from 'class-validator';

export class UsernameDto {
  @IsString()
  @IsNotEmpty()
  username: string;
}
