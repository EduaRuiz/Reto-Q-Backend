import { IEmailDomainService } from '@mail-sender-service/domain/services';
import { IUseCase } from './interface';
import { Observable } from 'rxjs';
import { IEventToManage } from '@mail-sender-service/domain/interfaces';

export class SendTokenUseCase implements IUseCase {
  constructor(private readonly emailService: IEmailDomainService) {}
  execute(data: IEventToManage): Observable<string> {
    return this.emailService.sendEmail(
      data.userEmail,
      'Token to present test',
      `Hi, your token is ${data.test.token}`,
    );
  }
}
