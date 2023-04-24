import { IEmailDomainService } from '@mail-sender-service/domain/services';
import { Observable } from 'rxjs';
import { IUseCase } from './interface';
import { IEventToManage } from '@mail-sender-service/domain/interfaces';

export class SendTestResultUseCase implements IUseCase {
  constructor(private readonly emailService: IEmailDomainService) {}
  execute(data: IEventToManage): Observable<string> {
    const result = data.test.questions.reduce((acc, question) => {
      return acc + question.points;
    }, 0);
    return this.emailService.sendEmail(
      data.userEmail,
      'Test result',
      `Hi, your test result is ${result}/30`,
    );
  }
}
