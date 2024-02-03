import { AdlibResponseQuestion } from './adlib-response-question.entity';
import { AdlibResponse } from './adlib-response.entity';
import { Adlib } from './adlib.entity';
import { Category } from './category.entity';

const entities = [Adlib, Category, AdlibResponse, AdlibResponseQuestion];

export { Adlib, Category, AdlibResponse, AdlibResponseQuestion };

export default entities;
