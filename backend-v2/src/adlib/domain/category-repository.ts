import { Id } from 'src/common/domain/id';

export interface CategoryRepository {
  newId: () => Promise<Id>;
}
