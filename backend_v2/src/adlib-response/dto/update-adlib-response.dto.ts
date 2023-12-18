import { PartialType } from '@nestjs/mapped-types';
import { CreateAdlibResponseDto } from './create-adlib-response.dto';

export class UpdateAdlibResponseDto extends PartialType(CreateAdlibResponseDto) {}
