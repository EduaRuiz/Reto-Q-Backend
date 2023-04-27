import { Test, TestingModule } from '@nestjs/testing';
import { Observable } from 'rxjs';
import * as delegate from '../../../application/delegators/question.delegator';
import { QuestionController } from '../question.controller';
import { QuestionModel, QuestionService } from '@main-service/infrastructure/persistance';
import { NewQuestionDto, UpdateQuestionDto } from '@main-service/infrastructure/utils';



jest.mock('../../../application/delegators/question.delegator');

describe('QuestionController', () => {
  let controller: QuestionController;
  let service: QuestionService;

  const _id = '641c65deff0153dd0f36bf5';

  jest
    .spyOn(delegate, 'QuestionDelegator')
    .mockReturnValue({} as any as delegate.QuestionDelegator);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: QuestionService,
          useValue: {},
        },
      ],
      controllers: [QuestionController],
    }).compile();
    controller = module.get<QuestionController>(QuestionController);
    service = module.get<QuestionService>(QuestionService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(delegate.QuestionDelegator).toHaveBeenCalledWith(service);
  });

  it('should call repository.getAll', (done) => {

    const mockData = new Array<QuestionModel>(
      {
        topic: 'DDD',
        level: '1',
        type: 'VoF',
        sentence: 'Es un AgregadoRoot una entidad?',
        options: ['Verdadero', 'Falso'],
        answer: ['Verdadero']
      },
      {
        topic: 'DDD',
        level: '1',
        type: 'VoF',
        sentence: 'Es un AgregadoRoot una entidad?',
        options: ['Verdadero', 'Falso'],
        answer: ['Verdadero']
      },
    );
    const expectedData = new Array<QuestionModel>(
      {
        topic: 'DDD',
        level: '1',
        type: 'VoF',
        sentence: 'Es un AgregadoRoot una entidad?',
        options: ['Verdadero', 'Falso'],
        answer: ['Verdadero']
      },
      {
        topic: 'DDD',
        level: '1',
        type: 'VoF',
        sentence: 'Es un AgregadoRoot una entidad?',
        options: ['Verdadero', 'Falso'],
        answer: ['Verdadero']
      },
    );
    const stubFind = jest.fn(
      () =>
        new Observable<QuestionModel[]>((subscriber) => {
          subscriber.next(mockData);
          subscriber.complete();
        }),
    );
    const expectedInstanceType = Array<QuestionModel>;
    (controller as any).delegate = {
      toGetAllQuestions: jest.fn(),
      execute: stubFind,
    };


    const result = controller.getAllQuestions();

    expect(stubFind).toHaveBeenCalled();
    result.subscribe({
      next: (value) => {
        expect(value).toEqual(expectedData);
        expect(value).toBeInstanceOf(expectedInstanceType);
        done();
      },
    });
  });

  it('should call repository.create', (done) => {

    const body = {
      topic: 'DDD',
      level: '1',
      type: 'VoF',
      sentence: 'Es un AgregadoRoot una entidad?',
      options: ['Verdadero', 'Falso'],
      answer: ['Verdadero']
    };
    const stubCreate = jest.fn(
      (data: NewQuestionDto) =>
        new Observable<QuestionModel>((subscriber) => {
          subscriber.next({ ...data, _id } as QuestionModel);
          subscriber.complete();
        }),
    );
    const expectedData = {
      _id,
      topic: 'DDD',
      level: '1',
      type: 'VoF',
      sentence: 'Es un AgregadoRoot una entidad?',
      options: ['Verdadero', 'Falso'],
      answer: ['Verdadero']
    } as QuestionModel;
    (controller as any).delegate = {
      toCreateQuestion: jest.fn(),
      execute: stubCreate,
    };


    const result = controller.registerQuestion(body);


    expect(stubCreate).toHaveBeenCalledWith(body);
    result.subscribe({
      next: (value) => {
        expect(value).toEqual(expectedData);
        done();
      },
    });
  });

  it('should call repository.getById', (done) => {

    const id = '641c70d41964e9445f593bcc';
    const mockQuestionMongo = {
      topic: 'DDD',
      level: '1',
      type: 'VoF',
      sentence: 'Es un AgregadoRoot una entidad?',
      options: ['Verdadero', 'Falso'],
      answer: ['Verdadero']
    };
    const expectedQuestionMongo = {
      topic: 'DDD',
      level: '1',
      type: 'VoF',
      sentence: 'Es un AgregadoRoot una entidad?',
      options: ['Verdadero', 'Falso'],
      answer: ['Verdadero']
    };
    const stubFind = jest.fn(
      () =>
        new Observable<QuestionModel>((subscriber) => {
          subscriber.next(mockQuestionMongo);
          subscriber.complete();
        }),
    );
    (controller as any).delegate = {
      toGetQuestion: jest.fn(),
      execute: stubFind,
    };


    const result = controller.getQuestionById(id);

    expect(stubFind).toHaveBeenCalled();
    result.subscribe({
      next: (value) => {
        expect(value).toEqual(expectedQuestionMongo);
        done();
      },
    });
  });

  it('should call repository.update', (done) => {

    const body = {
      topic: 'DDD',
      level: '1',
      type: 'VoF',
      sentence: 'Es un AgregadoRoot una entidad?',
      options: ['Verdadero', 'Falso'],
      answer: ['Verdadero']
    };
    const stubUpdate = jest.fn(
      (_id: string, data: UpdateQuestionDto) =>
        new Observable<QuestionModel>((subscriber) => {
          subscriber.next({ ...data, _id } as QuestionModel);
          subscriber.complete();
        }),
    );
    const expectedData = {
      _id,
      topic: 'DDD',
      level: '1',
      type: 'VoF',
      sentence: 'Es un AgregadoRoot una entidad?',
      options: ['Verdadero', 'Falso'],
      answer: ['Verdadero']
    } as QuestionModel;
    (controller as any).delegate = {
      toUpdateQuestion: jest.fn(),
      execute: stubUpdate,
    };

    const result = controller.updateQuestion(_id, body);


    expect(delegate.QuestionDelegator).toHaveBeenCalledWith(service);
    expect(stubUpdate).toHaveBeenCalledWith(_id, body);
    result.subscribe({
      next: (value) => {
        expect(value).toEqual(expectedData);
        done();
      },
    });
  });

  it('should call repository.delete', (done) => {

    const _id = '641c65deff0153dd0f36bf5';
    const stubDelete = jest.fn(
      () =>
        new Observable<boolean>((subscriber) => {
          subscriber.next(true);
          subscriber.complete();
        }),
    );
    const expectedData = true;
    (controller as any).delegate = {
      toDeleteQuestion: jest.fn(),
      execute: stubDelete,
    };


    const result = controller.deleteQuestionById(_id);


    expect(delegate.QuestionDelegator).toHaveBeenCalledWith(service);
    expect(stubDelete).toHaveBeenCalledWith(_id);
    result.subscribe({
      next: (value) => {
        expect(value).toEqual(expectedData);
        done();
      },
    });
  });
});
