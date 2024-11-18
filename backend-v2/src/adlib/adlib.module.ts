import { Logger, Module, Provider } from '@nestjs/common';
import { AdlibController } from './interface/adlib.controller';
import { InjectionToken } from './application/injection-token';
import { AdlibQueryImplementation } from './infrastructure/queries/adlib-query-implementation';
import { AdlibQueryHandlers } from './application/queries';
import { CqrsModule } from '@nestjs/cqrs';
import { AdlibCommandHandlers } from './application/commands';
import { AdlibFactory } from './domain/adlib-factory';
import { CategoryFactory } from './domain/category-factory';
import { AdlibRepositoryImplementation } from './infrastructure/repositories/adlib-repository-implementation';
import { OpenaiModule } from 'lib/openai.module';

export const infrastructure: Provider[] = [
  {
    provide: InjectionToken.ADLIB_QUERY,
    useClass: AdlibQueryImplementation,
  },
  {
    provide: InjectionToken.ADLIB_REPOSITORY,
    useClass: AdlibRepositoryImplementation,
  },
];

export const application = [...AdlibQueryHandlers, ...AdlibCommandHandlers];

export const domain = [AdlibFactory, CategoryFactory];

@Module({
  imports: [CqrsModule, OpenaiModule],
  controllers: [AdlibController],
  providers: [Logger, ...infrastructure, ...application, ...domain],
})
export class AdlibModule {}
