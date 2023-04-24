import { Controller, Get } from '@nestjs/common';
import { EmailService } from '../utils/services';
import { Observable, tap } from 'rxjs';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MailSenderDelegator } from '@mail-sender-service/application';
import { IEventToManage } from '@mail-sender-service/domain/interfaces';

@Controller()
export class MailSenderServiceController {
  private readonly delegator: MailSenderDelegator;
  constructor(private readonly mailSenderServiceService: EmailService) {
    this.delegator = new MailSenderDelegator(mailSenderServiceService);
  }

  @Get()
  getHello(): Observable<string> {
    return this.mailSenderServiceService.sendEmail(
      'eduaruizval@unal.edu.co',
      'prueba',
      'prueba',
    );
  }

  @MessagePattern('test-generated')
  sendToken(@Payload() data: string): Observable<string> {
    const toManage: IEventToManage = JSON.parse(data);
    this.delegator.toSendTokenUseCase();
    return this.delegator.execute<string>(toManage).pipe(
      tap(() => {
        console.log('test-generated');
      }),
    );
  }

  @MessagePattern('test-finished')
  sendResults(@Payload() data: string): Observable<string> {
    const toManage: IEventToManage = JSON.parse(data);
    this.delegator.toSendTestResultUseCase();
    return this.delegator.execute<string>(toManage).pipe(
      tap(() => {
        console.log('test-finished');
      }),
    );
  }
}
