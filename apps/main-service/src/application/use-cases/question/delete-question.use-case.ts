import { IQuestionDomainService } from '@main-service/domain/services';
import { IUseCase } from '../interface';
import { Observable } from 'rxjs';

export class DeleteQuestionUseCase implements IUseCase {
  constructor(
    private readonly iQuestionDomainService: IQuestionDomainService,
  ) {}
  execute(questionId: string): Observable<boolean> {
    return this.iQuestionDomainService.deleteQuestion(questionId);
  }
}
