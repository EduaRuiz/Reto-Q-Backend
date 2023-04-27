import { Observable } from 'rxjs';

export interface IEmailDomainService {
  sendEmail(
    to: string,
    subject: string,
    body: string,
    template?: string,
  ): Observable<string>;
}
