import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateAdlibCommand } from './create-adlib.command';
import { Id } from 'src/common/domain/id';
import { Inject } from '@nestjs/common';
import { InjectionToken } from '../../injection-token';
import { AdlibProperties } from 'src/adlib/domain/adlib';

@CommandHandler(CreateAdlibCommand)
export class CreateAdlibHandler
  implements ICommandHandler<CreateAdlibCommand, Id>
{
  execute(command: CreateAdlibCommand): Promise<Id> {
    throw new Error('Method not implemented.');
  }
  @Inject(InjectionToken.ADLIB_REPOSITORY)
  private readonly adlibRepository: AdlibProperties;
}
