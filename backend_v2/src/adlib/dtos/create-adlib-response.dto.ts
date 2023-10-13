import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from 'class-validator';

export class CreateAdlibResponseQuestionDto {
  @IsNotEmpty()
  @IsString()
  question: string;

  @IsNotEmpty()
  @IsString()
  answer: string;
}

export class CreateAdlibResponseDto {
  @IsNotEmpty()
  @IsString()
  adlibId: string;

  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @Type(() => CreateAdlibResponseQuestionDto)
  questions: CreateAdlibResponseQuestionDto[];
}
