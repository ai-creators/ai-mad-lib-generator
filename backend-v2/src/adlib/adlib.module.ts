import { Logger, Module, Provider } from '@nestjs/common';
import { AdlibController } from './interface/adlib.controller';
import { InjectionToken } from './application/injection-token';
import { AdlibQueryImplementation } from './infrastructure/queries/adlib-query-implementation';
import { AdlibQueryHandlers } from './application/queries';
import { CqrsModule } from '@nestjs/cqrs';

export const infrastructure: Provider[] = [
  {
    provide: InjectionToken.ADLIB_QUERY,
    useClass: AdlibQueryImplementation,
  },
];

export const application = [...AdlibQueryHandlers];

export const domain = [];

@Module({
  imports: [CqrsModule],
  controllers: [AdlibController],
  providers: [Logger, ...infrastructure, ...application, ...domain],
})
export class AdlibModule {}
