import { IUseCase } from '@mail-sender-service/application';
import { TestFinishedDomainEvent } from '@main-service/domain/events/publishers';
import { TestDomainModel, UserDomainModel } from '@main-service/domain/models';
import {
  ITestDomainService,
  IUserDomainService,
} from '@main-service/domain/services';
import { Observable, map, switchMap } from 'rxjs';

export class FinishTestUseCase implements IUseCase {
  constructor(
    private readonly testService: ITestDomainService,
    private readonly userService: IUserDomainService,
    private readonly testFinishedDomainEvent: TestFinishedDomainEvent,
  ) {}

  execute(token: string): Observable<string> {
    return this.testService.getTest(token).pipe(
      switchMap((test: TestDomainModel) => {
        return this.userService.getUserById(test.user_id).pipe(
          switchMap((user: UserDomainModel) => {
            const total = test.questions.reduce((acc, question) => {
              return acc + question.points;
            }, 0);
            total >= 26 && user.level !== '3'
              ? (user.level = (parseInt(user.level) + 1).toString())
              : (user.available = false);
            return this.userService.updateUser(user._id, user).pipe(
              map((user: UserDomainModel) => {
                this.testFinishedDomainEvent.publish({
                  test,
                  userEmail: user.email,
                });
                return JSON.stringify('Test finished');
              }),
            );
          }),
        );
      }),
    );
  }
}
