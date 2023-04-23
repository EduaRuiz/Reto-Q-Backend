import { IQuestionDomainModel } from '../models';

export interface IQuestionToTestDomain {
  question: IQuestionDomainModel;
  points: number;
  answered: boolean;
}
