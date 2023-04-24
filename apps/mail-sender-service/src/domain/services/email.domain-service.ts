import { Observable } from 'rxjs';

export interface IEmailDomainService {
  sendEmail(to: string, subject: string, body: string): Observable<string>;
}
