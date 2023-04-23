import { QuestionDomainModel } from '.';
import { ITestDomainModel } from './interfaces';

export class TestDomainModel implements ITestDomainModel {
  _id?: string;
  user_id: string;
  token: string;
  level: string;
  created_at: Date;
  started_at?: Date;
  questions: {
    question: QuestionDomainModel;
    points: number;
    answered: boolean;
  }[];
}
