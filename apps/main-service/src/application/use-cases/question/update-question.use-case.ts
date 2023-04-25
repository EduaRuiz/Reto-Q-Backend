import { IQuestionDomainService } from '@main-service/domain/services';
import { IUseCase } from '../interface';
import { Observable, map, switchMap } from 'rxjs';
import { QuestionDomainModel } from '@main-service/domain/models';
import { IUpdateQuestionDomainDto } from '@main-service/domain/dto';

export class UpdateQuestionUseCase implements IUseCase {
  constructor(private readonly questionService: IQuestionDomainService) {}
  execute(
    questionId: string,
    dto: IUpdateQuestionDomainDto,
  ): Observable<QuestionDomainModel> {
    let entity = new QuestionDomainModel();
    return this.questionService.getQuestionById(questionId).pipe(
      switchMap((question) => {
        entity = { ...question, ...dto };
        return this.questionService.updateQuestion(questionId, entity);
      }),
    );
  }
}
