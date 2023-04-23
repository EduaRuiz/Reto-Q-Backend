import { Module } from '@nestjs/common';
import { PersistenceModule } from './persistance';
import { MessagingModule } from './messaging';

@Module({
  imports: [PersistenceModule, MessagingModule],
  controllers: [],
  providers: [],
})
export class InfrastructureModule {}
