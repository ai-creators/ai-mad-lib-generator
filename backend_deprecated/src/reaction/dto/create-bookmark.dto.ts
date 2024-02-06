import { IsNotEmpty, IsString } from 'class-validator';
import { AccountLabel } from 'src/account/labels/account.label';
import { AdlibLabel } from 'src/adlib/labels/adlib.label';

export class CreateBookmarkDto {
  @IsNotEmpty({ message: AccountLabel.ACCOUNT_ID_IS_NOT_DEFINED })
  @IsString({ message: AccountLabel.ACCOUNT_ID_IS_NOT_STRING })
  accountId: string;

  @IsNotEmpty({ message: AdlibLabel.ADLIB_ID_IS_NOT_DEFINED })
  @IsString({ message: AdlibLabel.ADLIB_ID_IS_NOT_STRING })
  adlibId: string;
}
