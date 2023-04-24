import { Module } from '@nestjs/common';
import { InfrastructureModule } from './infrastructure';

@Module({
  imports: [InfrastructureModule],
  controllers: [],
  providers: [],
})
export class MailSenderServiceModule {}
