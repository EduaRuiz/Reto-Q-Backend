import { IQuestionDomainService } from '@main-service/domain/services';
import { IUseCase } from '../interface';
import { Observable } from 'rxjs';
import { QuestionDomainModel } from '@main-service/domain/models';

export class GetQuestionUseCase implements IUseCase {
  constructor(
    private readonly iQuestionDomainService: IQuestionDomainService,
  ) {}
  execute(questionId: string): Observable<QuestionDomainModel> {
    return this.iQuestionDomainService.getQuestionById(questionId);
  }
}
