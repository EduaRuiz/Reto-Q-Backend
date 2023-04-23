import { IQuestionToTestDomain } from '@main-service/domain/interfaces';

export interface ITestDomainModel {
  _id?: string;
  user_id: string;
  token: string;
  level: string;
  created_at: Date;
  started_at?: Date;
  questions: IQuestionToTestDomain[];
}
