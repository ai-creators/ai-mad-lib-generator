import { Controller } from '@nestjs/common';
import { AdlibResponseService } from './adlib-response.service';

@Controller('adlib-response')
export class AdlibResponseController {
  constructor(private readonly adlibResponseService: AdlibResponseService) {}
}
