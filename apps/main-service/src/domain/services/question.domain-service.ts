import { Observable } from "rxjs";
import { QuestionDomainModel } from "../models";

export interface IQuestionDomainService {

    createQuestion(question: QuestionDomainModel): Observable<QuestionDomainModel>;
    getQuestionById(id: string): Observable<QuestionDomainModel>;
    getAllQuestions(): Promise<QuestionDomainModel[]>;
    updateQuestion(id: string, question: QuestionDomainModel): Promise<QuestionDomainModel>;
    deleteQuestion(Id: string): Promise<boolean>;
    validateAnswer(Id: string, answer: string[]): Promise<boolean>;

  }