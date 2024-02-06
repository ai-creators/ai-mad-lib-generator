import { IsNotEmpty } from 'class-validator';
import { AccountLabel } from 'src/account/labels/account.label';
import { AdlibLabel } from 'src/adlib/labels/adlib.label';

export class BookmarkDto {
  @IsNotEmpty({ message: AccountLabel.ACCOUNT_ID_IS_EMPTY })
  accountId: string;

  @IsNotEmpty({ message: AdlibLabel.ADLIB_ID_IS_EMPTY })
  adlibId: string;
}
