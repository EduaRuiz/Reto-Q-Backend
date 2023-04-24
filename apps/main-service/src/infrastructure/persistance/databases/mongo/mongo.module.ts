import { Module } from '@nestjs/common';
import { MongooseConfigService } from './configs';
import { MongooseModule } from '@nestjs/mongoose';
import { TestMongoModel, TestSchema, UserMongoModel, UserSchema } from './models';
import { TestMongoService, UserMongoService } from './services';
import { TestMongoRepository, UserMongoRepository } from './repositories';
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
    ]),
  ],
  providers: [
    MongooseConfigService,
    TestMongoService,
    TestMongoRepository,
    UserMongoService,
    UserMongoRepository,
    RandomQuestionService,
    GenerateTestTokenService,
  ],
  exports: [
    TestMongoService,
    TestMongoRepository,
    UserMongoService,
    UserMongoRepository,
    RandomQuestionService,
    GenerateTestTokenService,
  ],
})
export class MongoModule {}
