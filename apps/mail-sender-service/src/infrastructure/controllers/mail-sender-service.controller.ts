import { Controller, Get } from '@nestjs/common';
import { MailSenderServiceService } from '../..';

@Controller()
export class MailSenderServiceController {
  constructor(
    private readonly mailSenderServiceService: MailSenderServiceService,
  ) {}

  @Get()
  getHello(): string {
    return this.mailSenderServiceService.getHello();
  }
}
