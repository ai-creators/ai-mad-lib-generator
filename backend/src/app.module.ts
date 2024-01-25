import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AdlibModule } from './adlib/adlib.module';
import { CommonModule } from './common/common.module';
import { GeneratorModule } from './generator/generator.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        uri: config.get<string>('MONGODB_URI'), // Loaded from .ENV
      }),
    }),
    AdlibModule,
    GeneratorModule,
    CommonModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
