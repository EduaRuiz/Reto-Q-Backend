import { Module } from '@nestjs/common';
import { EmailService } from './utils/services/email.service';
import { MailSenderServiceController } from './controllers';

@Module({
  imports: [],
  controllers: [MailSenderServiceController],
  providers: [EmailService],
})
export class InfrastructureModule {}
