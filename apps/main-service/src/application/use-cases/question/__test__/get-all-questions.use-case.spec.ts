import { Observable } from 'rxjs';
import { GetAllQuestionsUseCase } from '../get-all-questions.use-case';
import { IQuestionDomainService, QuestionDomainModel } from '@main-service/domain';

describe('GetAllQuestionsUseCase', () => {
  let useCase: GetAllQuestionsUseCase;
  let service: IQuestionDomainService;

  beforeEach(() => {
    service = {
      getAllQuestions: jest.fn(),
    } as any as IQuestionDomainService;
    useCase = new GetAllQuestionsUseCase(service);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  it('should call service.find', (done) => {
    const date = new Date();

    const mockData = [
      {
        _id: '641c65deff0153dd0f36bf5',
        topic: 'DDD',
        level: '1',
        type: 'VoF',
        sentence: 'Es un AgregadoRoot una entidad?',
        options: ['Verdadero', 'Falso'],
        answer: ['Verdadero']
      } as QuestionDomainModel,
      {
        _id: '641c65deff0153dd0f36bf5',
        topic: 'DDD',
        level: '1',
        type: 'VoF',
        sentence: 'Es un AgregadoRoot una entidad?',
        options: ['Verdadero', 'Falso'],
        answer: ['Verdadero']
      } as QuestionDomainModel,
    ];
    const expectedData = [
      {
        _id: '641c65deff0153dd0f36bf5',
        topic: 'DDD',
        level: '1',
        type: 'VoF',
        sentence: 'Es un AgregadoRoot una entidad?',
        options: ['Verdadero', 'Falso'],
        answer: ['Verdadero']
      } as QuestionDomainModel,
      {
        _id: '641c65deff0153dd0f36bf5',
        topic: 'DDD',
        level: '1',
        type: 'VoF',
        sentence: 'Es un AgregadoRoot una entidad?',
        options: ['Verdadero', 'Falso'],
        answer: ['Verdadero']
      } as QuestionDomainModel,
    ];
    const expectedInstanceType = Observable<QuestionDomainModel[]>;
    const stubFind = jest.fn(
      () =>
        new Observable<QuestionDomainModel[]>((subscriber) => {
          subscriber.next(mockData);
          subscriber.complete();
        }),
    );
    jest.spyOn(service, 'getAllQuestions').mockReturnValue(stubFind());

    const result = useCase.execute();


    expect(service.getAllQuestions).toHaveBeenCalled();
    expect(result).toBeInstanceOf(expectedInstanceType);
    result.subscribe({
      next: (data) => {
        expect(data).toEqual(expectedData);
        done();
      },
    });
  });
});
