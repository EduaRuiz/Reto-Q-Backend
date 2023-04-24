import { Controller, Get } from '@nestjs/common';
import { TestService } from '../persistance/services';
import { Observable } from 'rxjs';
import { MainDelegate } from '@main-service/application/delegators/main-delegator';

@Controller()
export class AppController {
  private readonly delegate: MainDelegate;

  constructor(private readonly testService: TestService) {}

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
}
