import { Properties } from "./Properties";

export interface AdLibProps extends Properties {
  timestamp: Date;
  page: number;
  pagination: number;
  type?: string;
}
