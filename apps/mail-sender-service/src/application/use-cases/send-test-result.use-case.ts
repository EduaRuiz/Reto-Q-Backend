import { IEmailDomainService } from '@mail-sender-service/domain/services';
import { Observable } from 'rxjs';
import { IUseCase } from './interface';
import { IEventToManage } from '@mail-sender-service/domain/interfaces';

export class SendTestResultUseCase implements IUseCase {
  private result: number = 0;
  private message: string = '';
  private readonly template: string = `
  <!DOCTYPE html>
<html>
<head>
	<title>Test Result</title>
	<style>
		.highlight {
			font-size: 48px;
			font-weight: bold;
		}
	</style>
</head>
<body style="margin: 0; padding: 0;">
	<table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #012d31; font-family: Arial, sans-serif;">
		<tr>
			<td align="center" style="padding: 50px;">
				<table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="max-width: 600px; background-color: #13ffd8; color: #012d31; border-radius: 10px; box-shadow: 0px 0px 20px rgba(0,0,0,0.5);">
					<tr>
						<td align="center" style="padding: 30px 20px 10px 20px;">
							<h2 style="font-size: 24px; font-weight: bold; margin: 0;">Hello there!</h2>
						</td>
					</tr>
					<tr>
						<td align="center" style="padding: 10px 20px 30px 20px;">
							<p style="font-size: 24px; font-weight: bold; margin: 0;">Your test result is:</p>
							<p style="font-size: 48px; margin: 40px 0 0 0;">
								<span>{this.result}</span>
								<span>/</span>
								<span class="highlight">30</span>
							</p>
							{this.message}
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
    this.result = data.test.questions.reduce((acc, question) => {
      return acc + question.points;
    }, 0);
    if (this.result >= 26) {
      this.message = `
			<p style="font-size: 16px; margin: 40px 0 0 0; text-align: center;">
				<span style="font-weight: bold;">Congratulations!</span>
				<span style="display: block;">You have passed the test, you can generate a new test for the next level.</span>
				<span style="display: block;">If you were already level 3 you will not be able to generate a new test.</span>
			</p>
			`;
    } else {
      this.message = `
			<p style="font-size: 16px; margin: 40px 0 0 0; text-align: center;">
				<span style="font-weight: bold;">Condolences</span>
				<span style="display: block;">Your score is not enough to level up.</span>
				<span style="display: block;">You can no longer generate or present more tests.</span>
			</p>
			`;
    }
    return this.emailService.sendEmail(
      data.userEmail,
      'Test result',
      `Hi, your test result is ${this.result}/30`,
      this.template
        .replace('{this.result}', this.result.toString())
        .replace('{this.message}', this.message),
    );
  }
}
