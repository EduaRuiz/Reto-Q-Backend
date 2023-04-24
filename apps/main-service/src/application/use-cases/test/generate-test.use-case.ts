import { Observable, catchError, of, switchMap, throwError } from 'rxjs';
import { INewTestDto } from '@main-service/domain/dto';
import {
  ITestDomainService,
  IUserDomainService,
} from '@main-service/domain/services';
import { TestDomainModel } from '@main-service/domain/models';
import { TestGeneratedDomainEvent } from '@main-service/domain/events/publishers';
import { IUseCase } from '../interface';

export class GenerateTestUseCase implements IUseCase {
  constructor(
    private readonly testService: ITestDomainService,
    private readonly userService: IUserDomainService,
    private readonly generatedTest: TestGeneratedDomainEvent,
  ) {}
  execute(dto: INewTestDto): Observable<{ success: boolean; message: string }> {
    return this.userService.getUserByEmail(dto.userEmail).pipe(
      switchMap((user) => {
        return user?.available
          ? this.validateIfTestAlreadyExists(
              user._id,
              user.level,
              dto.userEmail,
            )
          : throwError(() => new Error('User not available'));
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
          new Date(test.created_at).getTime() >
          Date.now() - 24 * 60 * 60 * 1000;
        const timerComplete = !!test?.started_at
          ? false
          : new Date(test.started_at).getTime() > Date.now() - 60 * 1000;
        !hasPassed24Hours &&
          !timerComplete &&
          this.generatedTest.publish({ test, userEmail });
        return hasPassed24Hours
          ? of({ success: false, message: 'Time limit exceeded' })
          : !timerComplete
          ? of({ success: false, message: 'Time limit exceeded' })
          : of({ success: true, message: 'Test available' });
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
