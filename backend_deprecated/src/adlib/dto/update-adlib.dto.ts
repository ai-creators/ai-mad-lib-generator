import { PartialType } from '@nestjs/mapped-types';
import { CreateAdlibDto } from './create-adlib.dto';

export class UpdateAdlibDto extends PartialType(CreateAdlibDto) {}
