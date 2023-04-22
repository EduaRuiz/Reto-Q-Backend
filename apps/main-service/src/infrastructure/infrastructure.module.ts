import { Module } from '@nestjs/common';
import { PersistenceModule } from './persistance';
import { MessagingModule } from './messaging';

@Module({
  imports: [],
  controllers: [],
  providers: [PersistenceModule, MessagingModule],
})
export class InfrastructureModule {}
