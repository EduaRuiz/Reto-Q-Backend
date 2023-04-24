import { Observable } from 'rxjs';
import { UserDomainModel } from '../models';

export interface IUserDomainService {
  getUserByEmail(email: string): Observable<UserDomainModel>;
  registerUser(entity: UserDomainModel): Observable<UserDomainModel>;
  getUserById(id: string): Observable<UserDomainModel>;
  updateUser(
    id: string,
    entity: UserDomainModel
  ): Observable<UserDomainModel>;
}
