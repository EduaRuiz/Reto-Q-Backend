import { IUseCase } from '@mail-sender-service/application';
import { TestFinishedDomainEvent } from '@main-service/domain/events/publishers';
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
      switchMap((test) => {
        return this.userService.getUserById(test.user_id).pipe(
          switchMap((user) => {
            const total = test.questions.reduce((acc, question) => {
              return acc + question.points;
            }, 0);
            total > 26 && user.level !== '3'
              ? (parseInt(user.level) + 1).toString()
              : total < 26
              ? (user.available = false)
              : (user.available = false);
            return this.userService.updateUser(user).pipe(
              map(() => {
                this.testFinishedDomainEvent.publish({
                  test,
                  userEmail: user.email,
                });
                return 'ok';
              }),
            );
          }),
        );
      }),
    );
  }
}
