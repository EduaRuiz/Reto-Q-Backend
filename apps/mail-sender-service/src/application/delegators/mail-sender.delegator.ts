import { Observable } from 'rxjs';
import { SendTestResultUseCase, SendTokenUseCase } from '../use-cases';
import { IEmailDomainService } from '@mail-sender-service/domain/services';
import { IUseCase } from '@main-service/application/use-cases/interface';

export class MailSenderDelegator implements IUseCase {
  private delegate: IUseCase;

  constructor(private readonly mailService: IEmailDomainService) {}

  execute<Response>(...args: any[]): Observable<Response> {
    return this.delegate.execute(...args);
  }

  toSendTestResultUseCase(): void {
    this.delegate = new SendTestResultUseCase(this.mailService);
  }

  toSendTokenUseCase(): void {
    this.delegate = new SendTokenUseCase(this.mailService);
  }
}
