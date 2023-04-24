import { UserDomainModel } from '@main-service/domain/models';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema({ collection: 'user', versionKey: false })
export class UserMongoModel extends UserDomainModel {
  _id?: string;

  @Prop({
    required: true,
    type: String,
  })
  fullName: string;

  @Prop({
    required: true,
    type: String,
  })
  email: string;

  @Prop({
    required: true,
    type: String,
  })
  level: string;

  @Prop({
    required: true,
    type: Boolean,
  })
  available: boolean;

  @Prop({
    required: true,
    type: String,
  })
  role?: string;
}

export const UserSchema = SchemaFactory.createForClass(UserMongoModel);
export type UserDocument = HydratedDocument<UserMongoModel>;
