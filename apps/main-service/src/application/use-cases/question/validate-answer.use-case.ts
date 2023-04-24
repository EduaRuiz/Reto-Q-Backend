import { IQuestionDomainService } from "@main-service/domain/services/question.domain-service";
import { IUseCase } from "../interface/use-case.interface";
import { Observable, map } from "rxjs";
import { QuestionDomainModel } from "../../../domain/models/question.domain-model";


export class ValidateAnswerUseCase implements IUseCase {

    constructor(private readonly iQuestionDomainService: IQuestionDomainService) {       
    }

    execute(id: string, answer: string[] ): Observable<boolean> {
      return this.iQuestionDomainService.getQuestionById(id).pipe(
        map((question) => {
          return JSON.stringify(question.answer) === JSON.stringify(answer);
        })
      );
    }    

  }