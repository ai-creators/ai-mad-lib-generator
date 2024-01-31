import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AdlibModule } from './adlib/adlib.module';
import { CommonModule } from './common/common.module';
import { GeneratorModule } from './generator/generator.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdlibResponseModule } from './adlib-response/adlib-response.module';
import entities from './data-model/entities';

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
        entities,
      }),
      inject: [ConfigService],
    }),
    AdlibModule,
    GeneratorModule,
    CommonModule,
    AdlibResponseModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
