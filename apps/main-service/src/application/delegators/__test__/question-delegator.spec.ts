import { Observable, of } from 'rxjs';
import * as UseCase from '../../use-cases/question';
import { QuestionDelegator } from '../question.delegator';
import { INewQuestionDomainDto, IQuestionDomainService, QuestionDomainModel } from '@main-service/domain';



jest.mock('../../use-cases/question/create-question.use-case');
jest.mock('../../use-cases/question/delete-question.use-case');
jest.mock('../../use-cases/question/get-all-questions.use-case');
jest.mock('../../use-cases/question/get-question.use-case');
jest.mock('../../use-cases/question/update-question.use-case');
jest.mock('../../use-cases/question/validate-answer.use-case');

describe('QuestionDelegate', () => {
  let delegator: QuestionDelegator;
  let service: IQuestionDomainService;

  beforeEach(() => {
    service = {
      createQuestion: jest.fn(),
      getQuestionById: jest.fn(),
      getAllQuestions: jest.fn(),
      updateQuestion: jest.fn(),
      deleteQuestion: jest.fn(),
    } as IQuestionDomainService;
    delegator = new QuestionDelegator(service);
  });

  it('should be defined', () => {
    expect(delegator).toBeDefined();
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
    jest.spyOn(UseCase, 'CreateQuestionUseCase').mockReturnValue({
      execute: stubCreate,
    } as any);


    delegator.toCreateQuestion();
    const result = delegator.execute(payload);


    expect(stubCreate).toHaveBeenCalledWith(payload);
    expect(result).toBeInstanceOf(expectedInstanceType);
    result.subscribe({
      next: (data) => {
        expect(data).toEqual(expectedData);
        done();
      },
    });
  });

  it('should call service.get', (done) => {

    const _id = '641c65deff0153dd0f36bf5';
    const mockData: QuestionDomainModel = {
      _id,
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
    const stubGet = jest.fn(
      () =>
        new Observable<QuestionDomainModel>((subscriber) => {
          subscriber.next(mockData);
          subscriber.complete();
        }),
    );
    jest.spyOn(UseCase, 'GetQuestionUseCase').mockReturnValue({
      execute: stubGet,
    } as any);


    delegator.toGetQuestion();
    const result = delegator.execute(_id);


    expect(stubGet).toHaveBeenCalled();
    expect(result).toBeInstanceOf(expectedInstanceType);
    result.subscribe({
      next: (value) => {
        expect(value).toEqual(expectedData);
        done();
      },
    });
  });

  it('should call service.getAll', (done) => {

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
    jest.spyOn(UseCase, 'GetAllQuestionsUseCase').mockReturnValue({
      execute: stubFind,
    } as any);


    delegator.toGetAllQuestions();
    const result = delegator.execute();


    expect(stubFind).toHaveBeenCalled();
    expect(result).toBeInstanceOf(expectedInstanceType);
    result.subscribe({
      next: (value) => {
        expect(value).toEqual(expectedData);
        done();
      },
    });
  });

  it('should call service.update', (done) => {

    const _id = '641c65deff0153dd0f36bf5';
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
    const stubUpdate = jest.fn(
      () =>
        new Observable<QuestionDomainModel>((subscriber) => {
          subscriber.next({ _id, ...mockData } as QuestionDomainModel);
          subscriber.complete();
        }),
    );
    jest.spyOn(UseCase, 'UpdateQuestionUseCase').mockReturnValue({
      execute: stubUpdate,
    } as any);


    delegator.toUpdateQuestion();
    const result = delegator.execute(_id, mockData);


    expect(stubUpdate).toHaveBeenCalledWith(_id, mockData);
    expect(result).toBeInstanceOf(expectedInstanceType);
    result.subscribe({
      next: (data) => {
        expect(data).toEqual(expectedData);
        done();
      },
    });
  });

  it('should call service.delete', (done) => {


    const _id = '641c65deff0153dd0f36bf5';
    const mockData = true;
    const expectedData = true;
    const expectedInstanceType = Observable<boolean>;
    const stubDelete = jest.fn(
      () =>
        new Observable<boolean>((subscriber) => {
          subscriber.next(mockData);
          subscriber.complete();
        }),
    );
    jest.spyOn(UseCase, 'DeleteQuestionUseCase').mockReturnValue({
      execute: stubDelete,
    } as any);


    delegator.toDeleteQuestion();
    const result = delegator.execute(mockData);

    expect(stubDelete).toHaveBeenCalledWith(mockData);
    expect(result).toBeInstanceOf(expectedInstanceType);
    result.subscribe({
      next: (data) => {
        expect(data).toEqual(expectedData);
        done();
      },
    });
  });

  it('should call service.validate', (done) => {
    const _id = '641c65deff0153dd0f36bf5';
    const mockData: QuestionDomainModel = {
      _id,
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
    const stubGet = jest.fn(
      () =>
        new Observable<QuestionDomainModel>((subscriber) => {
          subscriber.next(mockData);
          subscriber.complete();
        }),
    );
    jest.spyOn(UseCase, 'ValidateAnswerUseCase').mockReturnValue({
      execute: stubGet,
    } as any);


    delegator.toValidateAnswer();
    const result = delegator.execute(_id);


    expect(stubGet).toHaveBeenCalled();
    expect(result).toBeInstanceOf(expectedInstanceType);
    result.subscribe({
      next: (value) => {
        expect(value).toEqual(expectedData);
        done();
      },
    });
  });
});
