import {
  IQuestionDomainService,
  ITestDomainService,
  IUserDomainService,
} from '@main-service/domain/services';
import { IUseCase } from '../use-cases/interface';
import { Observable } from 'rxjs';
import { GenerateTestUseCase } from '../use-cases';
import { GeneratedTestDomainEvent } from '@main-service/domain/events/publishers';

export class MainDelegate implements IUseCase {
  private delegate: IUseCase;

  constructor(
    //services
    private readonly userService: IUserDomainService,
    private readonly questionService: IQuestionDomainService,
    private readonly testService: ITestDomainService,
    // Publishers
    private readonly generatedTest: GeneratedTestDomainEvent,
  ) {}

  execute<Response>(...args: any[]): Observable<Response> {
    return this.delegate.execute(...args);
  }

  toGenerateTest(): void {
    this.delegate = new GenerateTestUseCase(
      this.testService,
      this.userService,
      this.generatedTest,
    );
  }
}
