import { IsDate, IsInt, Max, Min } from 'class-validator';

export class PaginationDto {
  @IsInt()
  @Min(1)
  page: number;

  @IsInt()
  @Min(1)
  @Max(100)
  size: number;

  @IsDate()
  timestamp: Date;
}
