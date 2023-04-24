import { TestDomainModel } from '@main-service/domain/models';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema({ collection: 'test', versionKey: false })
export class TestMongoModel extends TestDomainModel {
  _id?: string;

  @Prop({
    required: true,
    type: String,
  })
  user_id: string;

  @Prop({
    required: true,
    type: String,
    unique: true,
  })
  token: string;

  @Prop({
    required: true,
    type: String,
  })
  level: string;

  @Prop({
    required: true,
    type: Date,
  })
  created_at: Date;

  @Prop({
    required: false,
    type: Date,
  })
  started_at?: Date;

  @Prop({
    required: true,
    type: [Object],
  })
  questions: {
    question: {
      topic: string;
      level: string;
      type: string;
      sentence: string;
      options: string[];
      answer: string[];
    };
    points: number;
    answered: boolean;
  }[];
}

export const TestSchema = SchemaFactory.createForClass(TestMongoModel);
export type TestDocument = HydratedDocument<TestMongoModel>;
