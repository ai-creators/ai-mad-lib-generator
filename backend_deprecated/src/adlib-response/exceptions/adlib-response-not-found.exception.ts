import { HttpException, HttpStatus } from '@nestjs/common';
import { AdlibResponseLabel } from '../labels/adlib-response.label';

export class AdlibResponseNotFound extends HttpException {
  constructor() {
    super(AdlibResponseLabel.ADLIB_RESPONSE_NOT_FOUND, HttpStatus.NOT_FOUND);
  }
}
