import { HttpException, HttpStatus } from '@nestjs/common';
import { AdlibResponseLabel } from '../labels/adlib-response.label';

export class AdlibResponseNotValid extends HttpException {
  constructor() {
    super(AdlibResponseLabel.ADLIB_RESPONSE_NOT_VALID, HttpStatus.BAD_REQUEST);
  }
}
