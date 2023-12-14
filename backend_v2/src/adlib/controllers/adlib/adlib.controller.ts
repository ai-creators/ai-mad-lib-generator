import { Controller } from '@nestjs/common';
import { AdlibService } from 'src/adlib/services/adlib/adlib.service';

@Controller('v1/adlib')
export class AdlibController {
  constructor(private readonly adlibService: AdlibService) {}
}
