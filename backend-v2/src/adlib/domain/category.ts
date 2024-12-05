import {
  BaseDomain,
  BaseDomainImplementation,
  BaseDomainProperties,
} from 'src/common/entities/base-domain';

export type CategoryEssentialProperties = Readonly<
  Required<{
    name: string;
  }>
>;

export type CategoryProperties = CategoryEssentialProperties &
  BaseDomainProperties;

export interface Category extends BaseDomain {
  getName(): string;
}

export class CategoryImplementation
  extends BaseDomainImplementation
  implements Category
{
  private readonly name: string;

  getName(): string {
    return this.name;
  }
}
