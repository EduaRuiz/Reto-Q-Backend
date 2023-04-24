import { Module } from '@nestjs/common';
import { MongoModule } from './databases/mongo';
import { QuestionService, TestService } from './services';

@Module({
  imports: [MongoModule],
  providers: [TestService, QuestionService],
  exports: [TestService, QuestionService],
})
export class PersistenceModule {}
