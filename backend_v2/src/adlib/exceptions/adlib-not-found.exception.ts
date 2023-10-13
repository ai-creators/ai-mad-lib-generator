import { HttpException } from '@nestjs/common';
import { AdlibLabels } from '../labels/adlib.label';

export class AdlibNotFoundException extends HttpException {
  public static NOT_FOUND_STATUS = 404;

  constructor() {
    super(AdlibLabels.ADLIB_NOT_FOUND, AdlibNotFoundException.NOT_FOUND_STATUS);
  }
}
