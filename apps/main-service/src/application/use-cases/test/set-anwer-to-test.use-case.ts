import { Observable, map } from 'rxjs';
import { IUseCase } from '../interface';
import { TestDomainModel } from '@main-service/domain/models';
import { ITestDomainService } from '@main-service/domain/services';
import { ISendAnswerToTestDto } from '@main-service/domain/dto';

export class SetAnswerToTestUseCase implements IUseCase {
  constructor(private readonly testService: ITestDomainService) {}

  execute(dto: ISendAnswerToTestDto): Observable<TestDomainModel> {
    return this.testService
      .setAnswer(dto.token, dto.questionSentence, dto.answer)
      .pipe(
        map((test) => {
          test.questions.forEach((question) => {
            question.question.answer = [];
          });
          return test;
        }),
      );
  }
}
