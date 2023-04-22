import { Module } from '@nestjs/common';
import { MailSenderServiceService } from './mail-sender-service.service';
import { MailSenderServiceController } from './infrastructure/controllers';

@Module({
  imports: [],
  controllers: [MailSenderServiceController],
  providers: [MailSenderServiceService],
})
export class MailSenderServiceModule {}
