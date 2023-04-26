import { Observable } from 'rxjs';
import { UpdateQuestionUseCase } from '../update-question.use-case';
import { IQuestionDomainService, IUpdateQuestionDomainDto, QuestionDomainModel } from '@main-service/domain';

describe('UpdateUseCase', () => {
  let useCase: UpdateQuestionUseCase;
  let service: IQuestionDomainService;

  beforeEach(() => {
    service = {
      updateQuestion: jest.fn(),
      getQuestionById: jest.fn(),
    } as any as IQuestionDomainService;
    useCase = new UpdateQuestionUseCase(service);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  it('should call service.updateQuestion', (done) => {

    const _id = '641c65deff0153dd0f36bf5';
    const mockData: IUpdateQuestionDomainDto = {
      topic: 'DDD',
      level: '1',
      type: 'VoF',
      sentence: 'Es un AgregadoRoot una entidad?',
      options: ['Verdadero', 'Falso'],
      answer: ['Verdadero']
    };
    const expectedData: QuestionDomainModel = {
      _id,
      topic: 'DDD',
      level: '1',
      type: 'VoF',
      sentence: 'Es un AgregadoRoot una entidad?',
      options: ['Verdadero', 'Falso'],
      answer: ['Verdadero']
    };
    const expectedInstanceType = Observable<QuestionDomainModel>;
    const stubUpdate = jest.fn(
      () =>
        new Observable<QuestionDomainModel>((subscriber) => {
          subscriber.next({ _id, ...mockData } as QuestionDomainModel);
          subscriber.complete();
        }),
    );
    jest.spyOn(service, 'getQuestionById').mockReturnValue(stubUpdate());
    jest.spyOn(service, 'updateQuestion').mockReturnValue(stubUpdate());


    const result = useCase.execute(_id, mockData);


    expect(result).toBeInstanceOf(expectedInstanceType);
    result.subscribe({
      next: (data) => {
        expect(data).toEqual(expectedData);
        done();
      },
    });
  });
});
