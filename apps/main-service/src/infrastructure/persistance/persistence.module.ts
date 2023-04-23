import { Module } from '@nestjs/common';
import { MongoModule } from './databases/mongo';

@Module({
  imports: [MongoModule],
  providers: [],
  exports: [],
})
export class PersistenceModule {}
