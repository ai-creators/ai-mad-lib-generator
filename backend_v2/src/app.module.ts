import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AdlibModule } from './adlib/adlib.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        uri: `mongodb+srv://${config.get<string>(
          'MONGODB_USERNAME',
        )}:${config.get<string>('MONGODB_PASSWORD')}@${config.get<string>(
          'MONGODB_HOST',
        )}/${'MONGODB_NAME'}?retryWrites=true&w=majority`,
      }),
      inject: [ConfigService],
    }),
    AdlibModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
