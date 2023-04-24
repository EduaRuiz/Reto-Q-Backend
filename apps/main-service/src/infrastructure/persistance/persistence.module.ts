import { Module } from '@nestjs/common';
import { MongoModule } from './databases/mongo';
import { TestService } from './services';

@Module({
  imports: [MongoModule],
  providers: [TestService],
  exports: [TestService],
})
export class PersistenceModule {}
