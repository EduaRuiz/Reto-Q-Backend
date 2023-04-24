import { Module } from '@nestjs/common';
import { MongooseConfigService } from './configs';
import { MongooseModule } from '@nestjs/mongoose';
import {
  QuestionMongoModel,
  QuestionSchema,
  TestMongoModel,
  TestSchema,
  UserMongoModel,
  UserSchema,
} from './models';
import { QuestionMongoService, TestMongoService, UserMongoService } from './services';
import { QuestionMongoRepository, TestMongoRepository, UserMongoRepository } from './repositories';
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
      { name: UserMongoModel.name, schema: UserSchema },
      { name: QuestionMongoModel.name, schema: QuestionSchema },
    ]),
  ],
  providers: [
    MongooseConfigService,
    TestMongoService,
    TestMongoRepository,
    UserMongoService,
    UserMongoRepository,
    QuestionMongoService,
    QuestionMongoRepository,
    RandomQuestionService,
    GenerateTestTokenService,
  ],
  exports: [
    TestMongoService,
    TestMongoRepository,
    UserMongoService,
    UserMongoRepository,
    QuestionMongoService,
    QuestionMongoRepository,
    RandomQuestionService,
    GenerateTestTokenService,
  ],
})
export class MongoModule {}
