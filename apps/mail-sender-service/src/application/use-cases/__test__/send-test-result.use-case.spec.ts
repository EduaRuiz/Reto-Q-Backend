import { IEmailDomainService } from '@mail-sender-service/domain/services';
import { of } from 'rxjs';
import { SendTestResultUseCase } from '../send-test-result.use-case';

describe('SendTestResultUseCase', () => {
  let emailServiceMock: jest.Mocked<IEmailDomainService>;
  let sendTestResultUseCase: SendTestResultUseCase;

  beforeEach(() => {
    emailServiceMock = {
      sendEmail: jest.fn(),
    } as jest.Mocked<IEmailDomainService>;
    sendTestResultUseCase = new SendTestResultUseCase(emailServiceMock);
  });

  it('should return the result of the test in the email body', () => {
    const date = new Date();
    const data = {
      userEmail: 'test@test.com',
      test: {
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
            points: 28,
            answered: true,
          },
        ],
      },
    };
    emailServiceMock.sendEmail.mockReturnValueOnce(of('success'));
    const result = sendTestResultUseCase.execute(data);
    expect(emailServiceMock.sendEmail).toHaveBeenCalled();
  });

  it('should return the result of the test in the email body', () => {
    const date = new Date();
    const data = {
      userEmail: 'test@test.com',
      test: {
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
            points: 24,
            answered: true,
          },
        ],
      },
    };
    emailServiceMock.sendEmail.mockReturnValueOnce(of('success'));
    const result = sendTestResultUseCase.execute(data);
    expect(emailServiceMock.sendEmail).toHaveBeenCalled();
  });
});
