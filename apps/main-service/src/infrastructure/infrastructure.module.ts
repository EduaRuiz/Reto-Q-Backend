import { Module } from '@nestjs/common';
import { PersistenceModule } from './persistance';
import { MessagingModule } from './messaging';
import { AppController } from './controllers';
import { UserController } from './controllers/user.controller';

@Module({
  imports: [PersistenceModule, MessagingModule],
  controllers: [
    AppController,
    UserController
  ],
  providers: [],
})
export class InfrastructureModule {}
