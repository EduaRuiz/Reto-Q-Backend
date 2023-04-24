import { Observable, map } from 'rxjs';
import { IUseCase } from '../interface';
import { TestDomainModel } from '@main-service/domain/models';
import { ITestDomainService } from '@main-service/domain/services';

export class SetAnswerToTestUseCase implements IUseCase {
  constructor(private readonly testService: ITestDomainService) {}

  execute(
    token: string,
    sentence: string,
    answer: string[],
  ): Observable<TestDomainModel> {
    return this.testService.setAnswer(token, sentence, answer).pipe(
      map((test) => {
        test.questions.forEach((question) => {
          question.question.answer = [];
        });
        return test;
      }),
    );
  }
}
