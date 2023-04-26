import { Observable } from 'rxjs';
import { CreateQuestionUseCase } from '../create-question.use-case';
import { INewQuestionDomainDto, IQuestionDomainService, QuestionDomainModel } from '@main-service/domain';

describe('CreateQuestionUseCase', () => {
  let useCase: CreateQuestionUseCase;
  let service: IQuestionDomainService;

  beforeEach(() => {
    service = {
      createQuestion: jest.fn(),
    } as any as IQuestionDomainService;
    useCase = new CreateQuestionUseCase(service);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  it('should call service.create', (done) => {

    const _id = '641c65deff0153dd0f36bf5';
    const payload: INewQuestionDomainDto = {
      topic: 'DDD',
      level: '1',
      type: 'VoF',
      sentence: 'Es un AgregadoRoot una entidad?',
      options: ['Verdadero', 'Falso'],
      answer: ['Verdadero']
    };
    const mockData: QuestionDomainModel = {
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
    const stubCreate = jest.fn(
      () =>
        new Observable<QuestionDomainModel>((subscriber) => {
          subscriber.next({ _id, ...mockData } as QuestionDomainModel);
          subscriber.complete();
        }),
    );
    jest.spyOn(service, 'createQuestion').mockReturnValue(stubCreate());


    const result = useCase.execute(payload);


    expect(result).toBeInstanceOf(expectedInstanceType);
    result.subscribe({
      next: (data) => {
        expect(data).toEqual(expectedData);
        done();
      },
    });
  });
});
