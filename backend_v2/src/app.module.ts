import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MessagesModule } from './messages/messages.module';
import { GeneratorModule } from './generator/generator.module';
import { CommonModule } from './common/common.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountModule } from './account/account.module';
import { AdlibModule } from './adlib/adlib.module';
import { OpenaiModule } from './vendors/openai/openai.module';
import entities from './data-model';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('POSTGRESQL_HOST'),
        port: +configService.get<number>('POSTGRESQL_PORT'),
        username: configService.get('POSTGRESQL_USERNAME'),
        password: configService.get('POSTGRESQL_PASSWORD'),
        database: configService.get('POSTGRESQL_NAME'),
        synchronize: true,
        entities: entities,
      }),
      inject: [ConfigService],
    }),
    MessagesModule,
    AdlibModule,
    CommonModule,
    AccountModule,
    GeneratorModule,
    OpenaiModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}