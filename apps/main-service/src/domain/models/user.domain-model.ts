import { IUserDomainModel } from './interfaces';

export class UserDomainModel implements IUserDomainModel {
  _id?: string;
  fullName: string;
  email: string;
  level: string;
  available: boolean;
  role?: string;
}
