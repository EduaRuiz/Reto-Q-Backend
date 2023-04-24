import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import {
  TestFinishedEventPublisher,
  TestGeneratedEventPublisher,
} from './publishers';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'MAIN_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [
            'amqps://zywsfcvd:xByr_xEQLTHN170SSr3aZBLm2W5_YSCO@shrimp.rmq.cloudamqp.com/zywsfcvd',
          ],
          queue: 'main_queue',
          queueOptions: { durable: false },
        },
      },
    ]),
  ],
  providers: [TestGeneratedEventPublisher, TestFinishedEventPublisher],
  exports: [TestGeneratedEventPublisher, TestFinishedEventPublisher],
})
export class MessagingModule {}
