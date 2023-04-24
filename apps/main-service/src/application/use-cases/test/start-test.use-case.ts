import { IUseCase } from '@mail-sender-service/application';
import { ITestDomainService } from '@main-service/domain/services';
import { Observable, map } from 'rxjs';

export class StartTestUseCase implements IUseCase {
  constructor(private readonly testService: ITestDomainService) {}

  execute(token: string): Observable<string> {
    return this.testService
      .startTest(token)
      .pipe(map(() => 'Test started successfully'));
  }
}
