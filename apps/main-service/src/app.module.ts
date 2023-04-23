import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AppController } from './infrastructure/controllers';
import { InfrastructureModule } from './infrastructure';

@Module({
  imports: [InfrastructureModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
