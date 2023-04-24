import { IQuestionDomainService } from "@main-service/domain/services/question.domain-service";
import { IUseCase } from "../interface/use-case.interface";
import { Observable } from "rxjs";


export class ValidateAnswerUseCase implements IUseCase {

    constructor(private readonly iQuestionDomainService: IQuestionDomainService) {       
    }

    execute(id: string, answer: string[] ): Observable<boolean> {
      return this.iQuestionDomainService.validateAnswer(id, answer);
    }   

  }