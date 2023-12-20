import { Account, Adlib } from 'src/data-model';
import { AdlibResponseQuestion } from 'src/data-model/entities/adlib-response-question.entity';

export class CreateAdlibResponseDto {
  adlib: Adlib;
  questions: AdlibResponseQuestion[];
  createdBy: Account;
}
