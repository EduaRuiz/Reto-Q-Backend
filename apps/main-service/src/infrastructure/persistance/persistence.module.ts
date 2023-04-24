import { Module } from '@nestjs/common';
import { MongoModule } from './databases/mongo';
import { TestService, UserService } from './services';

@Module({
  imports: [MongoModule],
  providers: [
    TestService,
    UserService,
  ],
  exports: [
    TestService,
    UserService,
  ],
})
export class PersistenceModule {}
