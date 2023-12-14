import { IsDate, IsInt, Max, Min } from 'class-validator';
import { IsBeforeNow } from 'src/common/validation/is-before-now-constraint/is-before-now-constraint';

export class PaginationDto {
  @IsInt()
  @Min(1)
  page: number;

  @IsInt()
  @Min(10)
  @Max(100)
  size: number;

  @IsDate()
  @IsBeforeNow()
  timestamp: Date;
}
