import { Module } from '@nestjs/common';
import { PersistenceModule } from './persistance';
import { MessagingModule } from './messaging';
import { TestController } from './controllers';

@Module({
  imports: [PersistenceModule, MessagingModule],
  controllers: [TestController],
  providers: [],
})
export class InfrastructureModule {}
