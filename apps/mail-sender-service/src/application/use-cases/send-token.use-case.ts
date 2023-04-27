import { IEmailDomainService } from '@mail-sender-service/domain/services';
import { IUseCase } from './interface';
import { Observable } from 'rxjs';
import { IEventToManage } from '@mail-sender-service/domain/interfaces';

export class SendTokenUseCase implements IUseCase {
  private token: string = '';
  private readonly template: string = `
  <!DOCTYPE html>
  <html>
  <head>
    <title>Token centrado</title>
  </head>
  <body style="margin: 0; padding: 0;">
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #012d31; font-family: Arial, sans-serif;">
      <tr>
        <td align="center" style="padding: 50px;">
          <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="max-width: 600px; background-color: #13ffd8; color: #012d31; border-radius: 10px; box-shadow: 0px 0px 20px rgba(0,0,0,0.5);">
            <tr>
              <td align="center" style="padding: 30px 20px 10px 20px;">
                <h2 style="font-size: 24px; font-weight: bold; margin: 0; text-transform: uppercase;">Hello there!</h2>
              </td>
            </tr>
            <tr>
              <td align="center" style="padding: 10px 20px 30px 20px;">
                <h1 style="font-size: 80px; font-weight: bold; margin: 0; text-transform: uppercase;">{this.token}</h1>
                <p style="font-size: 24px; font-weight: bold; margin: 0; text-transform: uppercase;">Your token is ready</p>
                <p style="font-size: 16px; margin: 40px 0 0 0;">Please note that your token is only valid for 24 hours. If you don't take the exam within this period, you will not have any other opportunities.</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
  </html>
`;
  constructor(private readonly emailService: IEmailDomainService) {}

  execute(data: IEventToManage): Observable<string> {
    this.token = data.test.token;
    return this.emailService.sendEmail(
      data.userEmail,
      'Token to present test',
      `Hi, your token is ${data.test.token}`,
      this.template.replace('{this.token}', this.token),
    );
  }
}
