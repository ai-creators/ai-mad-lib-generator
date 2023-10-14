import { HttpException } from '@nestjs/common';
import { AdlibResponseLabels } from '../labels/adlib-response.label';

export class AdlibResponseNotFoundException extends HttpException {
  public static readonly NOT_FOUND_STATUS = 404;

  constructor() {
    super(
      AdlibResponseLabels.ADLIB_RESPONSE_NOT_FOUND,
      AdlibResponseNotFoundException.NOT_FOUND_STATUS,
    );
  }
}
