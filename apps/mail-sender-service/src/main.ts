import { NestFactory } from '@nestjs/core';
import { MailSenderServiceModule } from './mail-sender-service.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(MailSenderServiceModule);

  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: [
        'amqps://zywsfcvd:xByr_xEQLTHN170SSr3aZBLm2W5_YSCO@shrimp.rmq.cloudamqp.com/zywsfcvd',
      ],
      queue: 'main_queue',
      queueOptions: { durable: false },
    },
  });
  await app.startAllMicroservices();
  // await app.listen(3000);
}
bootstrap();
