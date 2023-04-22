import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'RETO_Q_SERVICE',
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
  controllers: [],
  providers: [],
  exports: [],
})
export class MessagingModule {}
