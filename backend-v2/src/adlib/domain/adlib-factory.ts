import { Inject } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

type CreateAdlibOptions = Readonly<{}>;

export class AdlibFactory {
  @Inject(EventPublisher) private readonly eventPublisher: EventPublisher;
}
