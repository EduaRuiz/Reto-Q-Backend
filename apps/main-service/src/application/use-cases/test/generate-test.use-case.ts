import { Observable, catchError, of, switchMap, throwError } from 'rxjs';
import {
  ITestDomainService,
  IUserDomainService,
} from '@main-service/domain/services';
import { TestDomainModel } from '@main-service/domain/models';
import { TestGeneratedDomainEvent } from '@main-service/domain/events/publishers';
import { IUseCase } from '../interface';
import { BadRequestException } from '@nestjs/common';

export class GenerateTestUseCase implements IUseCase {
  constructor(
    private readonly testService: ITestDomainService,
    private readonly userService: IUserDomainService,
    private readonly generatedTest: TestGeneratedDomainEvent,
  ) {}
  execute(
    userEmail: string,
  ): Observable<{ success: boolean; message: string }> {
    return this.userService.getUserByEmail(userEmail).pipe(
      switchMap((user) => {
        return user.available
          ? this.validateIfTestAlreadyExists(
              user._id.toString(),
              user.level,
              userEmail,
            )
          : throwError(() => new BadRequestException('User not available'));
      }),
    );
  }

  private validateIfTestAlreadyExists(
    userId: string,
    level: string,
    userEmail: string,
  ): Observable<{ success: boolean; message: string }> {
    return this.testService.getTestByUserAndLevel(userId, level).pipe(
      switchMap((test: TestDomainModel) => {
        const hasPassed24Hours =
          new Date(test?.created_at).getTime() <
          Date.now() - 24 * 60 * 60 * 1000;
        const timerComplete =
          !!test?.started_at &&
          new Date(test?.started_at).getTime() < Date.now() - 60 * 60 * 1000;
        const testAvailable = test.questions.find(
          (question) => !question.answered,
        );
        !hasPassed24Hours &&
          !timerComplete &&
          !!testAvailable &&
          this.generatedTest.publish({ test, userEmail });
        return hasPassed24Hours
          ? of({ success: false, message: 'Time 24 hours limit exceeded' })
          : timerComplete
          ? of({
              success: false,
              message: 'Time 1 hour to finished the test is complete',
            })
          : !testAvailable
          ? of({ success: true, message: 'Test already answered' })
          : of({ success: true, message: 'Test token available in email' });
      }),
      catchError(() => {
        const newTest = {
          user_id: userId,
          level: level,
          created_at: new Date(),
          token: '',
          questions: [],
        };
        return this.testService.generateTest(newTest).pipe(
          switchMap((test: TestDomainModel) => {
            this.generatedTest.publish({ test, userEmail });
            return of({ success: true, message: 'Test available' });
          }),
        );
      }),
    );
  }
}
