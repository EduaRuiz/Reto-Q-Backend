import { IEmailDomainService } from '@mail-sender-service/domain/services';
import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { Transporter } from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import { Observable, from } from 'rxjs';

@Injectable()
export class EmailService implements IEmailDomainService {
  private readonly transporter: Transporter<SMTPTransport.SentMessageInfo>;
  private readonly emailFrom: string = '';
  private readonly password: string = '';

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: this.emailFrom,
        pass: this.password,
      },
    });
  }

  sendEmail(to: string, subject: string, body: string): Observable<string> {
    const mailOptions = {
      from: this.emailFrom,
      to: to,
      subject: subject,
      text: body,
    };

    return from(
      new Promise<string>((resolve, reject) => {
        this.transporter.sendMail(mailOptions, (error, info) => {
          error
            ? reject(`Error al enviar el correo: ${error}`)
            : resolve(`Correo enviado: ${info.response}`);
        });
      }),
    );
  }
}
