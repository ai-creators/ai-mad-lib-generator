import { IsDate, IsNumber } from 'class-validator';

export class GetFeaturedAdlibsPageableParam {
  @IsNumber()
  page: number;

  @IsNumber()
  size: number;

  @IsDate()
  timestamp: Date;
}
