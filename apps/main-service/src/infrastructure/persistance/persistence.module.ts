import { Module } from '@nestjs/common';
import { MongoModule } from './databases/mongo';
import { QuestionService, TestService, UserService } from './services';

@Module({
  imports: [MongoModule],
  providers: [TestService, QuestionService, UserService,],
  exports: [TestService, QuestionService, UserService,],
})
export class PersistenceModule {}
