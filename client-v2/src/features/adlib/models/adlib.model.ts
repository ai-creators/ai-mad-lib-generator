import { Category } from "./category.model";

export interface Adlib {
  id: number;
  oldId?: string;
  title: string;
  prompt: string;
  text: string;
  isPg?: boolean;
  temperature?: number;
  topP?: number;
  categories: Category[];
}
