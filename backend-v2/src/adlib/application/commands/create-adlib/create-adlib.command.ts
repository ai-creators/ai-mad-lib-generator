import { ICommand } from '@nestjs/cqrs';

export class CreateAdlibCommand implements ICommand {
  constructor(
    readonly prompt: string,
    readonly temperature: number,
  ) {}
}
