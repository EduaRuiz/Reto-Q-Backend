import { Observable, throwError } from 'rxjs';
import { InternalServerErrorException } from '@nestjs/common';
import { GetUserUseCase } from '../get-user.use-case';
import { IUserDomainService, UserDomainModel } from '@main-service/domain';

describe('GetUseCase', () => {
  let useCase: GetUserUseCase;
  let service: IUserDomainService;

  beforeEach(() => {
    service = {
      getUserById: jest.fn(),
    } as any as IUserDomainService;
    useCase = new GetUserUseCase(service);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  it('should call service.Get', (done) => {

    const _id = '641c65deff0153dd0f36bf5';
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
    jest.spyOn(service, 'getUserById').mockReturnValue(stubGet());


    const result = useCase.execute(_id);


    expect(result).toBeInstanceOf(expectedInstanceType);
    result.subscribe({
      next: (data) => {
        expect(data).toEqual(expectedData);
        done();
      },
    });
  });

  it('should throw InternalServerErrorException if an unexpected error occurs', (done) => {

    const _id = '641c65deff0153dd0f36bf5';
    const errorMessage = 'Something went wrong';
    const mockGetPublisher = jest.fn().mockReturnValueOnce(throwError(new Error(errorMessage)));
    service.getUserById = mockGetPublisher;


    const result = useCase.execute(_id)


    result.subscribe({
      error: (err) => {
        expect(err).toBeInstanceOf(InternalServerErrorException);
        expect(err.message).toBe(errorMessage);
        expect(mockGetPublisher).toHaveBeenCalledWith(_id);
        done();
      },
    });
  });


});

