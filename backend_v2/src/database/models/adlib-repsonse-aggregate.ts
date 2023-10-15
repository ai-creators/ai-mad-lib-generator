import {
  AdlibResponse,
  AdlibResponseDocument,
} from '../schemas/adlib-response.schema';
import { Adlib } from '../schemas/adlib.schema';

export interface AdlibResponseAggregate extends AdlibResponseDocument {
  adlib: Adlib;
}
