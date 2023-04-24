import { Observable } from 'rxjs';
import { UserDomainModel } from '../models';

export interface IUserDomainService {
  getUserByEmail(email: string): Observable<UserDomainModel>;
  getUserById(id: string): Observable<UserDomainModel>;
  updateUser(user: UserDomainModel): Observable<UserDomainModel>;
}
