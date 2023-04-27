import { IQuestionDomainService } from '@main-service/domain/services';
import { IUseCase } from '../interface/use-case.interface';
import { Observable, map } from 'rxjs';
import { QuestionDomainModel } from '@main-service/domain/models';

export class ValidateAnswerUseCase implements IUseCase {
  constructor(
    private readonly iQuestionDomainService: IQuestionDomainService,
  ) {}

  execute(id: string, answer: string[]): Observable<boolean> {
    return this.iQuestionDomainService.getQuestionById(id).pipe(
      map((question: QuestionDomainModel) => {
        return JSON.stringify(question.answer) === JSON.stringify(answer);
      }),
    );
  }
}
