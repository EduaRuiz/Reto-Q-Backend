import { IUseCase } from '@mail-sender-service/application/use-cases/interface';
import { TestDomainModel } from '@main-service/domain/models';
import { ITestDomainService } from '@main-service/domain/services';
import { BadRequestException } from '@nestjs/common';
import { Observable, of, switchMap, throwError } from 'rxjs';

export class GetTestUseCase implements IUseCase {
  constructor(private readonly testService: ITestDomainService) {}
  execute(token: string): Observable<TestDomainModel> {
    return this.testService.getTest(token).pipe(
      switchMap((test: TestDomainModel) => {
        const hasPassed24Hours =
          new Date(test?.created_at).getTime() <
          Date.now() - 24 * 60 * 60 * 1000;
        const timerComplete =
          !!test?.started_at &&
          new Date(test?.started_at).getTime() < Date.now() - 60 * 60 * 1000;
        test.questions.forEach((question) => {
          question.question.answer = undefined;
        });
        test.started_at = new Date();
        return hasPassed24Hours
          ? throwError(
              () => new BadRequestException('Time 24 hours limit exceeded'),
            )
          : timerComplete
          ? throwError(
              () =>
                new BadRequestException(
                  'Time 1 hour to finished the test is complete',
                ),
            )
          : of(test);
      }),
    );
  }
}
