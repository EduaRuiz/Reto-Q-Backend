import { Module } from '@nestjs/common';
import { PersistenceModule } from './persistance';
import { MessagingModule } from './messaging';
import { UserController } from './controllers/user.controller';
import { TestController } from './controllers';

@Module({
  imports: [PersistenceModule, MessagingModule],
  controllers: [TestController, UserController],

  providers: [],
})
export class InfrastructureModule {}
