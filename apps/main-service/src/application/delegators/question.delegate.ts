import { Observable } from "rxjs";
import { IUseCase } from "../use-cases/interface/use-case.interface";
import { IQuestionDomainService } from "../../domain/services/question.domain-service";
import { ValidateAnswerUseCase } from "../use-cases/question/validate-answer.use-case";



export class QuestionDelegate implements IUseCase {

   private delegate: IUseCase;

   constructor(private readonly iQuestionDomainService: IQuestionDomainService) {

   }

   execute(...args: any[]): Observable<any> {
      return this.delegate.execute(...args);
   }

   toValidateAnswer(): void {
      this.delegate = new ValidateAnswerUseCase(this.iQuestionDomainService);
   }


}