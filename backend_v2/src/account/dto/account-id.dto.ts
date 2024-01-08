import { IsNotEmpty, IsString } from 'class-validator';

export class AccountIdDto {
  @IsString()
  @IsNotEmpty()
  accountId: string;
}
