import { Observable } from 'rxjs';
import { UserDomainModel } from '../models';

export interface IUserDomainService {
  getUserByEmail(email: string): Observable<UserDomainModel>;
}
