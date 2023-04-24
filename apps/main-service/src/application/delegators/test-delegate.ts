import {
  IQuestionDomainService,
  ITestDomainService,
  IUserDomainService,
} from '@main-service/domain/services';
import { IUseCase } from '../use-cases/interface';
import { Observable } from 'rxjs';
import {
  FinishTestUseCase,
  GenerateTestUseCase,
  SetAnswerToTestUseCase,
  StartTestUseCase,
} from '../use-cases';
import {
  TestFinishedDomainEvent,
  TestGeneratedDomainEvent,
} from '@main-service/domain/events/publishers';

export class TestDelegate implements IUseCase {
  private delegate: IUseCase;

  constructor(
    //services
    private readonly userService: IUserDomainService,
    private readonly questionService: IQuestionDomainService,
    private readonly testService: ITestDomainService,
    // Publishers
    private readonly testGeneratedEvent: TestGeneratedDomainEvent,
    private readonly testFinishedEvent: TestFinishedDomainEvent,
  ) {}

  execute<Response>(...args: any[]): Observable<Response> {
    return this.delegate.execute(...args);
  }

  toGenerateTest(): void {
    this.delegate = new GenerateTestUseCase(
      this.testService,
      this.userService,
      this.testGeneratedEvent,
    );
  }

  toStartTest(): void {
    this.delegate = new StartTestUseCase(this.testService);
  }

  toFinishTest(): void {
    this.delegate = new FinishTestUseCase(
      this.testService,
      this.userService,
      this.testFinishedEvent,
    );
  }

  toSetAnswerToTest(): void {
    this.delegate = new SetAnswerToTestUseCase(this.testService);
  }
}
