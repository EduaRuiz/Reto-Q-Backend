import { Module } from '@nestjs/common';
import { MongooseConfigService } from './configs';
import { MongooseModule } from '@nestjs/mongoose';
import { TestMongoModel, TestSchema } from './models';
import { TestMongoService } from './services';
import { TestMongoRepository } from './repositories';
import {
  GenerateTestTokenService,
  RandomQuestionService,
} from '@main-service/infrastructure/utils/services';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useClass: MongooseConfigService,
    }),
    MongooseModule.forFeature([
      { name: TestMongoModel.name, schema: TestSchema },
    ]),
  ],
  providers: [
    MongooseConfigService,
    TestMongoService,
    TestMongoRepository,
    RandomQuestionService,
    GenerateTestTokenService,
  ],
  exports: [
    TestMongoService,
    TestMongoRepository,
    RandomQuestionService,
    GenerateTestTokenService,
  ],
})
export class MongoModule {}
