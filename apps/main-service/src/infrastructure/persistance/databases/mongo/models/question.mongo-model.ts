import { QuestionDomainModel } from '@main-service/domain/models';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema({ collection: 'question', versionKey: false })
export class QuestionMongoModel extends QuestionDomainModel {
  _id?: string;

  @Prop({
    required: true,
    type: String,
  })
  topic: string;

  @Prop({
    required: true,
    type: String,
  })
  level: string;

  @Prop({
    required: true,
    type: String,
  })
  type: string;

  @Prop({
    required: true,
    type: String,
  })
  sentence: string;

  @Prop({
    required: true,
    type: [String],
  })
  options: string[];

  @Prop({
    required: true,
    type: [String],
  })
  answer: string[];
}

export const QuestionSchema = SchemaFactory.createForClass(QuestionMongoModel);
export type QuestionDocument = HydratedDocument<QuestionMongoModel>;
