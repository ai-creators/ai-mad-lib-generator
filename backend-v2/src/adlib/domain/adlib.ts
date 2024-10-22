import {
  BaseDomainAggregateRoot,
  BaseDomainAggregateRootImplementation,
  BaseDomainProperties,
} from 'src/common/entities/base-domain';
import { Prompt } from './prompt';
import { Temperature } from './temperature';
import { TopP } from './top-p';
import { Category } from './category';

export type AdlibEssentialProperties = Readonly<
  Required<{
    title: string;
    prompt: string;
    text: string;
    temperature: number;
    topP: number;
  }>
>;

export type AdlibOptionalProperties = Readonly<
  Partial<{
    oldId: string;
    isHidden: boolean;
    isPg: boolean;
    isFeatured: boolean;
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
  getTopP(): TopP;
  getOldId(): string;
  getIsHidden(): boolean;
  getIsPg(): boolean;
  getIsFeatured(): boolean;
  getCategories(): Category[];
}

export class AdlibImplementation
  extends BaseDomainAggregateRootImplementation
  implements Adlib
{
  private readonly oldId: string;
  private readonly title: string;
  private readonly prompt: Prompt;
  private readonly text: string;
  private readonly isHidden: boolean;
  private readonly isPg: boolean;
  private readonly isFeatured: boolean;
  private readonly temperature: Temperature;
  private readonly topP: TopP;
  private readonly categories: Category[];

  getOldId(): string {
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

  getTopP(): TopP {
    return this.topP;
  }

  getCategories(): Category[] {
    return this.categories;
  }
}
