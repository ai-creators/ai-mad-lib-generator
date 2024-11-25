import {
  BaseDomainAggregateRoot,
  BaseDomainAggregateRootImplementation,
  BaseDomainProperties,
} from 'src/common/entities/base-domain';
import { Prompt } from './prompt';
import { Temperature } from './temperature';
import { Category } from './category';
import { Id } from 'src/common/domain/id';

export type AdlibEssentialProperties = Readonly<
  Required<{
    title: string;
    prompt: string;
    text: string;
    temperature: number;
  }>
>;

export type AdlibOptionalProperties = Readonly<
  Partial<{
    oldId: number;
    isHidden: boolean;
    isPg: boolean;
    isFeatured: boolean;
    categories: Category[];
  }>
>;

export type AdlibProperties = AdlibEssentialProperties &
  AdlibOptionalProperties &
  BaseDomainProperties;

export interface Adlib extends BaseDomainAggregateRoot {
  getTitle(): string;
  getPrompt(): Prompt;
  getText(): string;
  getTemperature(): Temperature;
  getOldId(): Id;
  getIsHidden(): boolean;
  getIsPg(): boolean;
  getIsFeatured(): boolean;
  getCategories(): Category[];
}

export class AdlibImplementation
  extends BaseDomainAggregateRootImplementation
  implements Adlib
{
  private readonly oldId: Id;
  private readonly title: string;
  private readonly prompt: Prompt;
  private readonly text: string;
  private readonly isHidden: boolean;
  private readonly isPg: boolean;
  private readonly isFeatured: boolean;
  private readonly temperature: Temperature;
  private readonly categories: Category[];

  constructor(properties: AdlibProperties) {
    super(properties);
    Object.assign(this, properties);
  }

  getOldId(): Id {
    return this.oldId;
  }

  getTitle(): string {
    return this.title;
  }

  getPrompt(): Prompt {
    return this.prompt;
  }

  getText(): string {
    return this.text;
  }

  getIsHidden(): boolean {
    return this.isHidden;
  }

  getIsPg(): boolean {
    return this.isPg;
  }

  getIsFeatured(): boolean {
    return this.isFeatured;
  }

  getTemperature(): Temperature {
    return this.temperature;
  }

  getCategories(): Category[] {
    return this.categories;
  }
}
