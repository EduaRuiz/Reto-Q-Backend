import { Module } from '@nestjs/common';
import { InfrastructureModule } from './infrastructure';
import { APP_FILTER } from '@nestjs/core';
import { MongoServerErrorExceptionFilter } from './infrastructure/utils/exception-filters';

@Module({
  imports: [InfrastructureModule],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: MongoServerErrorExceptionFilter,
    },
  ],
})
export class AppModule {}
