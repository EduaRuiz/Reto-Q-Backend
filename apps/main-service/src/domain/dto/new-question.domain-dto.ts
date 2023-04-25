export interface INewQuestionDomainDto {
  topic: string;
  level: string;
  type: string;
  sentence: string;
  options: string[];
  answer: string[];
}
