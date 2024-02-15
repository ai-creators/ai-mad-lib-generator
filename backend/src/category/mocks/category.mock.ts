import { Category } from 'src/data-model/entities';

export function mockCategoryService() {
  return {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    findCategoryByName: jest.fn((name: string): Promise<Category> => {
      return Promise.resolve(new Category());
    }),
    saveCategory: jest.fn((category: Category): Promise<Category> => {
      return Promise.resolve(category);
    }),
  };
}

export function mockCategoryRepository() {
  return () => ({
    save: jest.fn(),
  });
}
