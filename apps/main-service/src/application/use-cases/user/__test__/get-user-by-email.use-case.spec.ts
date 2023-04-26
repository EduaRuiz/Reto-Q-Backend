import { Observable, throwError } from 'rxjs';
import { InternalServerErrorException } from '@nestjs/common';
import { IUserDomainService, UserDomainModel } from '@main-service/domain';
import { GetUserByEmailUseCase } from '../get-user-by-email.use-case';


describe('GetUseCase', () => {
  let useCase: GetUserByEmailUseCase;
  let service: IUserDomainService;

  beforeEach(() => {
    service = {
      getUserByEmail: jest.fn(),
    } as any as IUserDomainService;
    useCase = new GetUserByEmailUseCase(service);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  it('should call service.Get', (done) => {

    const payload = 'correo@correo.com';
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
    jest.spyOn(service, 'getUserByEmail').mockReturnValue(stubGet());


    const result = useCase.execute(payload);


    expect(result).toBeInstanceOf(expectedInstanceType);
    result.subscribe({
      next: (data) => {
        expect(data).toEqual(expectedData);
        done();
      },
    });
  });

  it('should throw InternalServerErrorException if an unexpected error occurs', (done) => {

    const payload = 'correo@correo.com';
    const errorMessage = 'Something went wrong';
    const mockGetPublisher = jest.fn().mockReturnValueOnce(throwError(new Error(errorMessage)));
    service.getUserByEmail = mockGetPublisher;


    const result = useCase.execute(payload)


    result.subscribe({
      error: (err) => {
        expect(err).toBeInstanceOf(InternalServerErrorException);
        expect(err.message).toBe(errorMessage);
        expect(mockGetPublisher).toHaveBeenCalledWith(payload);
        done();
      },
    });
  });
});

