import { IUpdateUserDto, IUserDomainService, UserDomainModel } from '@main-service/domain';
import { Observable } from 'rxjs';
import { UpdateUserUseCase } from '../update-user.use-case';


describe('UpdateUseCase', () => {
  let useCase: UpdateUserUseCase;
  let service: IUserDomainService;

  beforeEach(() => {
    service = {
      updateUser: jest.fn(),
    } as any as IUserDomainService;
    useCase = new UpdateUserUseCase(service);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  it('should call service.updateUser', (done) => {

    const _id = '641c65deff0153dd0f36bf5';
    const mockData: IUpdateUserDto = {
      level: "2",
      available: true,
    };
    const expectedData = {
      _id,
      level: "2",
      available: true,
    };
    const expectedInstanceType = Observable<UserDomainModel>;
    const stubUpdate = jest.fn(
      () =>
        new Observable<UserDomainModel>((subscriber) => {
          subscriber.next({ _id, ...mockData } as UserDomainModel);
          subscriber.complete();
        }),
    );
    jest.spyOn(service, 'updateUser').mockReturnValue(stubUpdate());


    const result = useCase.execute(_id, mockData);


    expect(service.updateUser).toHaveBeenCalledWith(_id, mockData);
    expect(result).toBeInstanceOf(expectedInstanceType);
    result.subscribe({
      next: (data) => {
        expect(data).toEqual(expectedData);
        done();
      },
    });
  });
});
