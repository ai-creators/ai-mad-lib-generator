import { Account } from './entities/account.entity';
import { AdlibResponseQuestion } from './entities/adlib-response-question.entity';
import { AdlibResponse } from './entities/adlib-response.entity';
import { Adlib } from './entities/adlib.entity';
import { Category } from './entities/category.entity';

const entities = [
  Account,
  Adlib,
  Category,
  AdlibResponse,
  AdlibResponseQuestion,
];

export { Account, Adlib, Category, AdlibResponseQuestion };
export default entities;
