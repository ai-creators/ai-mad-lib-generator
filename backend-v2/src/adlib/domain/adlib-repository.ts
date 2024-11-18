import { Id } from 'src/common/domain/id';
import { Adlib } from './adlib';

export interface AdlibRepository {
  newId: () => Promise<Id>;
  save: (adlib: Adlib | Adlib[]) => Promise<void>;
}
