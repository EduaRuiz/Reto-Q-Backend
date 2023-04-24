import { Observable } from "rxjs";
import { IUseCase } from "../use-cases/interface/use-case.interface";
import { IQuestionDomainService } from "../../domain/services/question.domain-service";



export class QuestionDelegate implements IUseCase {

   private delegate: IUseCase;

   constructor(private readonly iQuestionDomainService : IQuestionDomainService) {

   }
   
   execute(...args: any[]): Observable<any> {
      return this.delegate.execute(...args);
   }

   
  
   
}