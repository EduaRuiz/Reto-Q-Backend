import { Module } from '@nestjs/common';
import { MongooseConfigService } from './configs';
import { MongooseModule } from '@nestjs/mongoose';
import {
  QuestionMongoModel,
  QuestionSchema,
  TestMongoModel,
  TestSchema,
} from './models';
import { QuestionMongoService, TestMongoService } from './services';
import { QuestionMongoRepository, TestMongoRepository } from './repositories';
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
      { name: QuestionMongoModel.name, schema: QuestionSchema },
      // { name: UserMongoModel.name, schema: UserSchema },
    ]),
  ],
  providers: [
    MongooseConfigService,
    TestMongoService,
    TestMongoRepository,
    QuestionMongoService,
    QuestionMongoRepository,
    RandomQuestionService,
    GenerateTestTokenService,
  ],
  exports: [
    TestMongoService,
    TestMongoRepository,
    QuestionMongoService,
    QuestionMongoRepository,
    RandomQuestionService,
    GenerateTestTokenService,
  ],
})
export class MongoModule {}
