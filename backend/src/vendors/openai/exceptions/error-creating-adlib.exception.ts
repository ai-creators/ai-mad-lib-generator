import { HttpException, HttpStatus } from '@nestjs/common';
import { OpenaiLabel } from '../labels/openai.label';

export class ErrorCreatingAdlibException extends HttpException {
  constructor() {
    super(OpenaiLabel.ERROR_CREATING_ADLIB, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
