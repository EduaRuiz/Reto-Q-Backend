import { Module } from '@nestjs/common';
import { AppController } from './infrastructure/controllers';
import { InfrastructureModule } from './infrastructure';

@Module({
  imports: [InfrastructureModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
