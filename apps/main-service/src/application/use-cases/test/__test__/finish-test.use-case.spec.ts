import { of } from 'rxjs';
import { TestFinishedDomainEvent } from '@main-service/domain/events/publishers';
import {
  ITestDomainService,
  IUserDomainService,
} from '@main-service/domain/services';
import { FinishTestUseCase } from '../finish-test.use-case';
import { TestDomainModel, UserDomainModel } from '@main-service/domain';

describe('FinishTestUseCase', () => {
  let useCase: FinishTestUseCase;
  let testService: ITestDomainService;
  let userService: IUserDomainService;
  let testFinishedDomainEvent: TestFinishedDomainEvent;

  beforeEach(() => {
    testService = {
      getTest: jest.fn(),
    } as any as ITestDomainService;

    userService = {
      getUserById: jest.fn(),
      updateUser: jest.fn(),
    } as any as IUserDomainService;

    testFinishedDomainEvent = {
      publish: jest.fn(),
    } as any as TestFinishedDomainEvent;

    useCase = new FinishTestUseCase(
      testService,
      userService,
      testFinishedDomainEvent,
    );
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  it('should call testService.getTest and userService.getUserById', (done) => {
    const date = new Date();
    const token = 'CNTP-3875';
    const test = {
      _id: 'testId',
      user_id: 'userId',
      token: 'CNTP-3875',
      level: '1',
      created_at: date,
      questions: [
        {
          question: {
            _id: '6445dd2187ccd7fd3c489284',
            type: 'unique',
            topic: 'Arquitectura Empresarial',
            level: '1',
            sentence:
              '¿Qué patrón arquitectónico se enfoca en la separación de responsabilidades y la escalabilidad del código?',
            options: [
              'Arquitectura limpia',
              'Patrón MVC',
              'Patrón Singleton',
              'Patrón Factory',
            ],
            answer: ['Arquitectura limpia'],
          },
          points: 2,
          answered: true,
        },
        {
          question: {
            _id: '6445dd2187ccd7fd3c489284',
            type: 'unique',
            topic: 'Arquitectura Empresarial',
            level: '1',
            sentence:
              '¿Qué patrón arquitectónico se enfoca en la separación de responsabilidades y la escalabilidad del código?',
            options: [
              'Arquitectura limpia',
              'Patrón MVC',
              'Patrón Singleton',
              'Patrón Factory',
            ],
            answer: ['Arquitectura limpia'],
          },
          points: 2,
          answered: true,
        },
      ],
    };
    const user = {
      _id: 'userId',
      fullName: 'Cristian Tironi',
      email: 'user@example.com',
      level: '2',
      available: true,
    };
    const expectedUser = {
      ...user,
      level: '3',
    };

    jest.spyOn(testService, 'getTest').mockReturnValue(of(test));
    jest.spyOn(userService, 'getUserById').mockReturnValue(of(user));
    jest.spyOn(userService, 'updateUser').mockReturnValue(of(expectedUser));

    const result = useCase.execute(token);

    result.subscribe({
      next: (data) => {
        expect(data).toEqual(JSON.stringify('Test finished'));
        expect(testService.getTest).toHaveBeenCalledWith(token);
        expect(userService.getUserById).toHaveBeenCalledWith(test.user_id);
        done();
      },
    });
  });
});
