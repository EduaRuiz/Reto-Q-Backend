import { Injectable } from '@nestjs/common';

@Injectable()
export class MailSenderServiceService {
  getHello(): string {
    return 'Hello World!';
  }
}
