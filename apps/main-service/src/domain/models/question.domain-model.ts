import { IQuestionDomainModel } from './interfaces';

export class QuestionDomainModel implements IQuestionDomainModel {

  _id?: string;
  topic: string;
  level: string;
  type: string;
  sentence: string;
  options: string[];
  answer: string[];

}