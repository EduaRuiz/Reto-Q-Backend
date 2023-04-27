import { Test, TestingModule } from '@nestjs/testing';
import { EmailService } from '../email.service';

describe('EmailService', () => {
    let service: EmailService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [EmailService],
        }).compile();

        service = module.get<EmailService>(EmailService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should send an email successfully', done => {
        const to = 'example@example.com';
        const subject = 'Test Email';
        const body = 'This is a test email.';
        const template = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>${subject}</title>
        </head>
        <body>
          <h1>${subject}</h1>
          <p>${body}</p>
        </body>
      </html>
    `;

        service.sendEmail(to, subject, body, template).subscribe(result => {
            expect(result).toMatch(/Correo enviado:/);
            done();
        });
    });
});