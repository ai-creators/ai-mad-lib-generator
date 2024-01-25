import { HttpException, HttpStatus } from '@nestjs/common';
import { AdlibLabel } from '../labels/adlib.label';

export class AdlibNotFoundException extends HttpException {
  constructor() {
    super(AdlibLabel.ADLIB_NOT_FOUND, HttpStatus.NOT_FOUND);
  }
}
