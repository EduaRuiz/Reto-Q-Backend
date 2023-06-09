import { IQuestionDomainService } from '@main-service/domain/services';
import { IUseCase } from '../interface';
import { Observable, switchMap } from 'rxjs';
import { QuestionDomainModel } from '@main-service/domain/models';
import { IUpdateQuestionDomainDto } from '@main-service/domain/dto';

export class UpdateQuestionUseCase implements IUseCase {
  constructor(private readonly questionService: IQuestionDomainService) {}
  execute(
    questionId: string,
    dto: IUpdateQuestionDomainDto,
  ): Observable<QuestionDomainModel> {
    return this.questionService.getQuestionById(questionId).pipe(
      switchMap((question: QuestionDomainModel) => {
        const entity = { ...(question as any)._doc, ...dto };
        return this.questionService.updateQuestion(questionId, entity);
      }),
    );
  }
}
