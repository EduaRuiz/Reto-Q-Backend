import { Module } from '@nestjs/common';
import { MongooseConfigService } from './configs';
import { MongooseModule } from '@nestjs/mongoose';
import { TestMongoModel, TestSchema } from './models';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useClass: MongooseConfigService,
    }),
    MongooseModule.forFeature([
      { name: TestMongoModel.name, schema: TestSchema },
    ]),
  ],
  providers: [MongooseConfigService],
  exports: [],
})
export class MongoModule {}
