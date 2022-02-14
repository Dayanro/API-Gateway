import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from "@nestjs/microservices";
import {  AllExceptionsFilter } from './filters/http-exception.filter';
import { APP_FILTER } from '@nestjs/core';

@Module({
  imports:  [
    ClientsModule.register([
      {
        name: 'FILEPROCESSOR',
        transport: Transport.TCP,
        options: {
          host: '127.0.0.1',
          port: 8877
        }
      }
    ])
  ],
  controllers: [AppController],
  providers: [AppService,     
    {
    provide: APP_FILTER,
    useClass: AllExceptionsFilter,
  },]
})
export class AppModule {}
