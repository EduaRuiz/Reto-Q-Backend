import { IUserDomainModel } from './interfaces';

export class UserDomainModel implements IUserDomainModel {
  _id?: string;
  fullName: string;
  email: string;
  level: string;
  available: boolean;
  role?: string;

  constructor(_data?: IUserDomainModel) {
    if (_data?.fullName) this.fullName = _data.fullName;
    if (_data?.email) this.email = _data.email;
    if (_data?.level) this.level = _data.level;
    if (_data?.available) this.available = _data.available;
    if (_data?.role) this.role = _data.role;
  }
}
