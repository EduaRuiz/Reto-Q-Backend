import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AppController } from './infrastructure/controllers';
import { InfrastructureModule } from './infrastructure';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [InfrastructureModule, AppService],
})
export class AppModule {}
