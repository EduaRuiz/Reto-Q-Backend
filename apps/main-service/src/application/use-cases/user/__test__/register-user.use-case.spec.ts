import { Observable } from 'rxjs';
import { RegisterUserUseCase } from '../register-user.use-case';
import { IRegisterUserDto, IUserDomainService, UserDomainModel } from '@main-service/domain';


describe('RegisterUserUseCase', () => {
  let useCase: RegisterUserUseCase;
  let service: IUserDomainService;

  beforeEach(() => {
    service = {
      registerUser: jest.fn(),
    } as any as IUserDomainService;
    useCase = new RegisterUserUseCase(service);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
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
    const mockData: UserDomainModel = {
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
      () =>
        new Observable<UserDomainModel>((subscriber) => {
          subscriber.next({ _id, ...mockData } as UserDomainModel);
          subscriber.complete();
        }),
    );
    jest.spyOn(service, 'registerUser').mockReturnValue(stubCreate());


    const result = useCase.execute(payload);


    expect(service.registerUser).toHaveBeenCalledWith(mockData);
    expect(result).toBeInstanceOf(expectedInstanceType);
    result.subscribe({
      next: (data) => {
        expect(data).toEqual(expectedData);
        done();
      },
    });
  });
});
