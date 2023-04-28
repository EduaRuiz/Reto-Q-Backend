import { SendTokenUseCase } from '@mail-sender-service/application';
import { IEmailDomainService } from '@mail-sender-service/domain/services';
import { of } from 'rxjs';

describe('SendTokenUseCase', () => {
  let emailServiceMock: jest.Mocked<IEmailDomainService>;
  let sendTokenUseCase: SendTokenUseCase;

  beforeEach(() => {
    emailServiceMock = {
      sendEmail: jest.fn(),
    } as jest.Mocked<IEmailDomainService>;
    sendTokenUseCase = new SendTokenUseCase(emailServiceMock);
  });

  it('should return the token in the email body', () => {
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
    const expectedBody = 'Hi, your token is CNTP-3875';
    emailServiceMock.sendEmail.mockReturnValueOnce(of('success'));

    const result = sendTokenUseCase.execute(data);

    expect(emailServiceMock.sendEmail).toHaveBeenCalled();
  });
});
