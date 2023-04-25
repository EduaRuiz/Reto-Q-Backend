import { IQuestionDomainService } from '@main-service/domain/services';
import { IUseCase } from '../interface';
import { Observable } from 'rxjs';
import { INewQuestionDomainDto } from '@main-service/domain/dto';
import { QuestionDomainModel } from '@main-service/domain/models';

export class CreateQuestionUseCase implements IUseCase {
  constructor(
    private readonly iQuestionDomainService: IQuestionDomainService,
  ) {}
  execute(dto: INewQuestionDomainDto): Observable<QuestionDomainModel> {
    return this.iQuestionDomainService.createQuestion(dto);
  }
}
