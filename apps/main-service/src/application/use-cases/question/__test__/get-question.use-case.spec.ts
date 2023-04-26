import { Observable } from 'rxjs';
import { GetQuestionUseCase } from '../get-question.use-case';
import { IQuestionDomainService, QuestionDomainModel } from '@main-service/domain';

describe('GetUseCase', () => {
  let useCase: GetQuestionUseCase;
  let service: IQuestionDomainService;

  beforeEach(() => {
    service = {
      getQuestionById: jest.fn(),
    } as any as IQuestionDomainService;
    useCase = new GetQuestionUseCase(service);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  it('should call service.Get', (done) => {

    const _id = '641c65deff0153dd0f36bf5';
    const mockData =
      {
        _id,
        topic: 'DDD',
        level: '1',
        type: 'VoF',
        sentence: 'Es un AgregadoRoot una entidad?',
        options: ['Verdadero', 'Falso'],
        answer: ['Verdadero']
      } as QuestionDomainModel
    const expectedData =
      {
        _id,
        topic: 'DDD',
        level: '1',
        type: 'VoF',
        sentence: 'Es un AgregadoRoot una entidad?',
        options: ['Verdadero', 'Falso'],
        answer: ['Verdadero']
      } as QuestionDomainModel
    const expectedInstanceType = Observable<QuestionDomainModel>;
    const stubGet = jest.fn(
      () =>
        new Observable<QuestionDomainModel>((subscriber) => {
          subscriber.next(mockData);
          subscriber.complete();
        }),
    );
    jest.spyOn(service, 'getQuestionById').mockReturnValue(stubGet());


    const result = useCase.execute(_id);


    expect(result).toBeInstanceOf(expectedInstanceType);
    result.subscribe({
      next: (data) => {
        expect(data).toEqual(expectedData);
        done();
      },
    });
  });
});

