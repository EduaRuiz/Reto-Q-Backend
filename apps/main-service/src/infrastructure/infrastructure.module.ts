import { Module } from '@nestjs/common';
import { PersistenceModule } from './persistance';
import { MessagingModule } from './messaging';
import { UserController } from './controllers/user.controller';
import { QuestionController, TestController } from './controllers';

@Module({
  imports: [PersistenceModule, MessagingModule],
  controllers: [TestController, UserController, QuestionController],

  providers: [],
})
export class InfrastructureModule {}
