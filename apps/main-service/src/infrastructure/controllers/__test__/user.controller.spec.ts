import { Test, TestingModule } from '@nestjs/testing';
import { Observable } from 'rxjs';
import * as delegate from '../../../application/delegators/user-delegator';
import { UserController } from '../user.controller';
import { UserModel, UserService } from '@main-service/infrastructure/persistance';
import { RegisterUserDto, UpdateUserDto } from '@main-service/infrastructure/utils';



jest.mock('../../../application/delegators/user-delegator');

describe('UserController', () => {
  let controller: UserController;
  let service: UserService;

  const _id = '641c65deff0153dd0f36bf5';

  jest
    .spyOn(delegate, 'UserDelegator')
    .mockReturnValue({} as any as delegate.UserDelegator);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: UserService,
          useValue: {},
        },
      ],
      controllers: [UserController],
    }).compile();
    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(delegate.UserDelegator).toHaveBeenCalledWith(service);
  });

  it('should call repository.create', (done) => {

    const body = {
      fullName: "Cristian Tironi",
      email: "correo@correo.com",
      level: "2",
      available: true,
      role: "admin"
    };
    const stubCreate = jest.fn(
      (data: RegisterUserDto) =>
        new Observable<UserModel>((subscriber) => {
          subscriber.next({ ...data, _id } as UserModel);
          subscriber.complete();
        }),
    );
    const expectedData = {
      _id,
      fullName: "Cristian Tironi",
      email: "correo@correo.com",
      level: "2",
      available: true,
      role: "admin"
    } as UserModel;
    (controller as any).delegate = {
      toRegisterUser: jest.fn(),
      execute: stubCreate,
    };


    const result = controller.registerUser(body);


    expect(stubCreate).toHaveBeenCalledWith(body);
    result.subscribe({
      next: (value) => {
        expect(value).toEqual(expectedData);
        done();
      },
    });
  });

  it('should call repository.getById', (done) => {

    const id = '641c70d41964e9445f593bcc';
    const mockUserMongo = {
      fullName: "Cristian Tironi",
      email: "correo@correo.com",
      level: "2",
      available: true,
      role: "admin"
    };
    const expectedUserMongo = {
      fullName: "Cristian Tironi",
      email: "correo@correo.com",
      level: "2",
      available: true,
      role: "admin"
    };
    const stubFind = jest.fn(
      () =>
        new Observable<UserModel>((subscriber) => {
          subscriber.next(mockUserMongo);
          subscriber.complete();
        }),
    );
    (controller as any).delegate = {
      toGetUser: jest.fn(),
      execute: stubFind,
    };


    const result = controller.getUserById(id);


    expect(stubFind).toHaveBeenCalled();
    result.subscribe({
      next: (value) => {
        expect(value).toEqual(expectedUserMongo);
        done();
      },
    });
  });

  it('should call repository.getUserByEmail', (done) => {

    const data = "correo@correo.com";
    const mockUserMongo = {
      fullName: "Cristian Tironi",
      email: "correo@correo.com",
      level: "2",
      available: true,
      role: "admin"
    };
    const expectedUserMongo = {
      fullName: "Cristian Tironi",
      email: "correo@correo.com",
      level: "2",
      available: true,
      role: "admin"
    };
    const stubFind = jest.fn(
      () =>
        new Observable<UserModel>((subscriber) => {
          subscriber.next(mockUserMongo);
          subscriber.complete();
        }),
    );
    (controller as any).delegate = {
      toGetUserByEmail: jest.fn(),
      execute: stubFind,
    };


    const result = controller.getUserByEmail(data);

    expect(stubFind).toHaveBeenCalled();
    result.subscribe({
      next: (value) => {
        expect(value).toEqual(expectedUserMongo);
        done();
      },
    });
  });

  it('should call repository.update', (done) => {

    const body = {
      level: "2",
      available: true,
    };
    const stubUpdate = jest.fn(
      (_id: string, data: UpdateUserDto) =>
        new Observable<UserModel>((subscriber) => {
          subscriber.next({ ...data, _id } as UserModel);
          subscriber.complete();
        }),
    );
    const expectedData = {
      _id,
      level: "2",
      available: true,
    } as UserModel;
    (controller as any).delegate = {
      toUpdateUser: jest.fn(),
      execute: stubUpdate,
    };

    const result = controller.updateUser(_id, body);


    expect(delegate.UserDelegator).toHaveBeenCalledWith(service);
    expect(stubUpdate).toHaveBeenCalledWith(_id, body);
    result.subscribe({
      next: (value) => {
        expect(value).toEqual(expectedData);
        done();
      },
    });
  });
});
