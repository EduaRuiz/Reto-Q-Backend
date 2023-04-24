import { Body, Controller, Get, Post } from '@nestjs/common';
import { QuestionService, TestService } from '../persistance/services';
import { Observable } from 'rxjs';
import { TestDelegate } from '@main-service/application/delegators';
import {
  TestFinishedEventPublisher,
  TestGeneratedEventPublisher,
} from '../messaging';

@Controller('test')
export class TestController {
  private readonly delegate: TestDelegate;

  constructor(
    // private readonly userService: any,
    private readonly questionService: QuestionService,
    private readonly testService: TestService,
    private readonly testGeneratedEvent: TestGeneratedEventPublisher,
    private readonly testFinishedEvent: TestFinishedEventPublisher,
  ) {
    this.delegate = new TestDelegate(
      {} as any,
      this.questionService,
      this.testService,
      this.testGeneratedEvent,
      this.testFinishedEvent,
    );
  }

  @Get()
  getHello(): Observable<any> {
    return this.testService.generateTest({
      user_id: '123',
      token: '',
      level: '1',
      created_at: new Date(),
      questions: [],
    });
  }

  @Post('generate')
  generateTest(
    userEmail: string,
  ): Observable<{ success: boolean; message: string }> {
    this.delegate.toGenerateTest();
    return this.delegate.execute<{ success: boolean; message: string }>(
      userEmail,
    );
  }

  @Post('start')
  startTest(@Body() token: { token: string }): Observable<string> {
    this.delegate.toStartTest();
    return this.delegate.execute<string>(token.token);
  }

  @Post('finish')
  finishTest(@Body() token: { token: string }): Observable<string> {
    this.delegate.toFinishTest();
    return this.delegate.execute<string>(token.token);
  }

  @Post('answer')
  setAnswerToTest(
    @Body() answer: { token: string; question_id: string; answer: string },
  ): Observable<string> {
    this.delegate.toSetAnswerToTest();
    return this.delegate.execute<string>(answer);
  }
}
