import { Observable } from 'rxjs';
import * as UseCase from '../../use-cases/user';
import { UserDelegator } from '../user-delegator';
import { IRegisterUserDto, IUserDomainService, UserDomainModel } from '@main-service/domain';


jest.mock('../../use-cases/user/get-user-by-email.use-case');
jest.mock('../../use-cases/user/get-user.use-case');
jest.mock('../../use-cases/user/register-user.use-case');
jest.mock('../../use-cases/user/update-user.use-case');

describe('UserDelegate', () => {
  let delegator: UserDelegator;
  let service: IUserDomainService;

  beforeEach(() => {
    service = {
      registerUser: jest.fn(),
      getUserByEmail: jest.fn(),
      getUserById: jest.fn(),
      updateUser: jest.fn(),
    } as IUserDomainService;

    delegator = new UserDelegator(service);
  });

  it('should be defined', () => {
    expect(delegator).toBeDefined();
  });


  it('should call service.create', (done) => {

    const _id = '641c65deff0153dd0f36bf5';
    const payload: IRegisterUserDto = {
      fullName: "Cristian Tironi",
      email: "correo@correo.com",
      level: "2",
      available: true,
      role: "admin"
    };
    const expectedData: UserDomainModel = {
      _id,
      fullName: "Cristian Tironi",
      email: "correo@correo.com",
      level: "2",
      available: true,
      role: "admin"
    };
    const expectedInstanceType = Observable<UserDomainModel>;
    const stubCreate = jest.fn(
      (User) =>
        new Observable<UserDomainModel>((subscriber) => {
          subscriber.next({ _id, ...User } as UserDomainModel);
          subscriber.complete();
        }),
    );
    jest.spyOn(UseCase, 'RegisterUserUseCase').mockReturnValue({
      execute: stubCreate,
    } as any);


    delegator.toRegisterUser();
    const result = delegator.execute<Observable<UserDomainModel>>(payload);


    expect(stubCreate).toHaveBeenCalledWith(payload);
    expect(result).toBeInstanceOf(expectedInstanceType);
    result.subscribe({
      next: (data) => {
        expect(data).toEqual(expectedData);
        done();
      },
    });
  });

  it('should call service.get', (done) => {

    const _id = '641c65deff0153dd0f36bf5';
    const mockData =
      {
        _id,
        fullName: "Cristian Tironi",
        email: "correo@correo.com",
        level: "2",
        available: true,
        role: "admin"
      } as UserDomainModel
    const expectedData =
      {
        _id,
        fullName: "Cristian Tironi",
        email: "correo@correo.com",
        level: "2",
        available: true,
        role: "admin"
      } as UserDomainModel
    const expectedInstanceType = Observable<UserDomainModel>;
    const stubGet = jest.fn(
      () =>
        new Observable<UserDomainModel>((subscriber) => {
          subscriber.next(mockData);
          subscriber.complete();
        }),
    );
    jest.spyOn(UseCase, 'GetUserUseCase').mockReturnValue({
      execute: stubGet,
    } as any);


    delegator.toGetUser();
    const result = delegator.execute<Observable<UserDomainModel>>(_id);


    expect(stubGet).toHaveBeenCalled();
    expect(result).toBeInstanceOf(expectedInstanceType);
    result.subscribe({
      next: (value) => {
        expect(value).toEqual(expectedData);
        done();
      },
    });
  });

  it('should call service.getByEMail', (done) => {

    const payload = {
      email: "correo@correo.com",
    }
    const mockData =
      {
        _id: '641c65deff0153dd0f36bf5',
        fullName: "Cristian Tironi",
        email: "correo@correo.com",
        level: "2",
        available: true,
        role: "admin"
      } as UserDomainModel
    const expectedData =
      {
        _id: '641c65deff0153dd0f36bf5',
        fullName: "Cristian Tironi",
        email: "correo@correo.com",
        level: "2",
        available: true,
        role: "admin"
      } as UserDomainModel
    const expectedInstanceType = Observable<UserDomainModel>;
    const stubGet = jest.fn(
      () =>
        new Observable<UserDomainModel>((subscriber) => {
          subscriber.next(mockData);
          subscriber.complete();
        }),
    );
    jest.spyOn(UseCase, 'GetUserByEmailUseCase').mockReturnValue({
      execute: stubGet,
    } as any);


    delegator.toGetUserByEmail();
    const result = delegator.execute<Observable<UserDomainModel>>(payload);


    expect(stubGet).toHaveBeenCalled();
    expect(result).toBeInstanceOf(expectedInstanceType);
    result.subscribe({
      next: (value) => {
        expect(value).toEqual(expectedData);
        done();
      },
    });
  });

  it('should call service.update', (done) => {
    const _id = '641c65deff0153dd0f36bf5';
    const mockData = {
      fullName: "Cristian Tironi",
      email: "correo@correo.com",
      level: "2",
      available: true,
      role: "admin"
    };
    const expectedData = {
      _id,
      fullName: "Cristian Tironi",
      email: "correo@correo.com",
      level: "2",
      available: true,
      role: "admin"
    };
    const expectedInstanceType = Observable<UserDomainModel>;
    const stubUpdate = jest.fn(
      () =>
        new Observable<UserDomainModel>((subscriber) => {
          subscriber.next({ _id, ...mockData } as UserDomainModel);
          subscriber.complete();
        }),
    );
    jest.spyOn(UseCase, 'UpdateUserUseCase').mockReturnValue({
      execute: stubUpdate,
    } as any);


    delegator.toUpdateUser();
    const result = delegator.execute<Observable<UserDomainModel>>(_id, mockData);


    expect(stubUpdate).toHaveBeenCalledWith(_id, mockData);
    expect(result).toBeInstanceOf(expectedInstanceType);
    result.subscribe({
      next: (data) => {
        expect(data).toEqual(expectedData);
        done();
      },
    });
  });
});
