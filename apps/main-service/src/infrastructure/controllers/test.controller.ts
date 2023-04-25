import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import {
  QuestionService,
  TestService,
  UserService,
} from '../persistance/services';
import { Observable } from 'rxjs';
import { TestDelegate } from '@main-service/application/delegators';
import {
  TestFinishedEventPublisher,
  TestGeneratedEventPublisher,
} from '../messaging';
import { SendAnswerToTestDto } from '../utils/dto';
import { EmailPipe } from '../utils/pipes';

@Controller('test')
export class TestController {
  private readonly delegate: TestDelegate;

  constructor(
    private readonly userService: UserService,
    private readonly questionService: QuestionService,
    private readonly testService: TestService,
    private readonly testGeneratedEvent: TestGeneratedEventPublisher,
    private readonly testFinishedEvent: TestFinishedEventPublisher,
  ) {
    this.delegate = new TestDelegate(
      this.userService,
      this.questionService,
      this.testService,
      this.testGeneratedEvent,
      this.testFinishedEvent,
    );
  }

  @Post('generate/:userEmail')
  generateTest(
    @Param('userEmail', EmailPipe) userEmail: string,
  ): Observable<{ success: boolean; message: string }> {
    this.delegate.toGenerateTest();
    return this.delegate.execute<{ success: boolean; message: string }>(
      userEmail,
    );
  }

  @Post('start/:token')
  startTest(@Param('token') token: string): Observable<string> {
    this.delegate.toStartTest();
    return this.delegate.execute<string>(token);
  }

  @Post('finish/:token')
  finishTest(@Param('token') token: string): Observable<string> {
    this.delegate.toFinishTest();
    return this.delegate.execute<string>(token);
  }

  @Post('answer')
  setAnswerToTest(@Body() answer: SendAnswerToTestDto): Observable<string> {
    this.delegate.toSetAnswerToTest();
    return this.delegate.execute<string>(answer);
  }
}
