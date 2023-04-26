export interface IUpdateQuestionDomainDto {
  topic?: string;
  level?: string;
  type?: string;
  sentence?: string;
  options?: string[];
  answer?: string[];
}
