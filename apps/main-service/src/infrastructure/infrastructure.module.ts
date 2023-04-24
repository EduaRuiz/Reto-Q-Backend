import { Module } from '@nestjs/common';
import { PersistenceModule } from './persistance';
import { MessagingModule } from './messaging';
import { AppController } from './controllers';

@Module({
  imports: [PersistenceModule, MessagingModule],
  controllers: [AppController],
  providers: [],
})
export class InfrastructureModule {}
