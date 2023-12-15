import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MessagesModule } from './messages/messages.module';
import { AdlibModule } from './adlib/adlib.module';
import { CommonModule } from './common/common.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountModule } from './account/account.module';
import { Account } from './data-model/entities/account.entity';
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
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
