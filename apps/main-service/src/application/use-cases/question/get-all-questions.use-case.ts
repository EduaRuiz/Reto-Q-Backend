import { IQuestionDomainService } from '@main-service/domain/services';
import { IUseCase } from '../interface';
import { Observable } from 'rxjs';
import { QuestionDomainModel } from '@main-service/domain/models';

export class GetAllQuestionsUseCase implements IUseCase {
  constructor(
    private readonly iQuestionDomainService: IQuestionDomainService,
  ) {}
  execute(): Observable<QuestionDomainModel[]> {
    return this.iQuestionDomainService.getAllQuestions();
  }
}
