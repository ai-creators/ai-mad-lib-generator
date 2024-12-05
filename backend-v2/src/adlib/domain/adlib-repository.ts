import { Adlib } from './adlib';

export interface AdlibRepository {
  newId(): Promise<string>;
  save(adlib: Adlib | Adlib[]): Promise<void>;
}
