import { Model } from 'mongoose';
import { MongoServerError } from 'mongodb';
import { of, throwError } from 'rxjs';
import { getModelToken } from '@nestjs/mongoose';
import { QuestionMongoRepository } from '..';
import { QuestionMongoModel } from '../../models';
import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';

describe('QuestionMongoRepository', () => {
  let repository: QuestionMongoRepository;
  let model: Model<QuestionMongoModel>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        QuestionMongoRepository,
        {
          provide: getModelToken(QuestionMongoModel.name),
          useValue: {
            create: jest.fn(),
            findByIdAndUpdate: jest.fn(),
            findByIdAndDelete: jest.fn(),
            find: jest.fn(),
            findById: jest.fn(),
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    repository = module.get<QuestionMongoRepository>(QuestionMongoRepository);
    model = module.get<Model<QuestionMongoModel>>(
      getModelToken(QuestionMongoModel.name),
    );
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });

  describe('create', () => {
    it('should create a Question', (done) => {
      // Arrange
      const entity = {} as unknown as QuestionMongoModel;
      const createdQuestion = { ...entity } as unknown as QuestionMongoModel;
      jest
        .spyOn(model, 'create')
        .mockReturnValueOnce(of(createdQuestion) as any);

      // Act
      const result$ = repository.create(entity);

      // Assert
      result$.subscribe({
        next: (result) => {
          expect(result).toBe(createdQuestion);
          expect(model.create).toHaveBeenCalledWith(entity);
          done();
        },
      });
    });

    it('should throw a MongoServerError when there is a conflict', (done) => {
      // Arrange
      const entity: QuestionMongoModel = {} as any;
      const message = 'Conflict while creating question';
      const error = new MongoServerError(new Error(message));
      jest
        .spyOn(model, 'create')
        .mockReturnValueOnce(throwError(() => error) as any);

      // Act
      const result$ = repository.create(entity);

      // Assert
      result$.subscribe({
        error: (err) => {
          expect(err).toBeInstanceOf(MongoServerError);
          expect(err.message).toBe(message);
          expect(err.cause).toBeInstanceOf(Error);
          expect(err.cause.message).toBe(message);
          done();
        },
      });
    });
  });

  describe('update', () => {
    it('should update a Question', (done) => {
      // Arrange
      const entityId = '123';
      const entity = {} as unknown as QuestionMongoModel;
      const existingQuestion = { ...entity } as unknown as QuestionMongoModel;
      const updatedQuestion = { ...entity } as unknown as QuestionMongoModel;
      jest.spyOn(model, 'findById').mockReturnValueOnce(entity as any);
      jest.spyOn(repository, 'findOneById').mockReturnValueOnce(of(entity));
      jest
        .spyOn(model, 'findByIdAndUpdate')
        .mockReturnValueOnce(of(updatedQuestion) as any);

      // Act
      const result$ = repository.update(entityId, entity);

      // Assert
      result$.subscribe({
        next: (result) => {
          expect(result).toBe(updatedQuestion);
          expect(model.findByIdAndUpdate).toHaveBeenCalledWith(
            { _id: entityId.toString() },
            { ...existingQuestion, ...entity, _id: entityId },
            { new: true },
          );
          done();
        },
      });
    });

    it('should throw a MongoServerError when there is a conflict', (done) => {
      // Arrange
      const entityId = '123';
      const entity = {} as unknown as QuestionMongoModel;
      const message = 'Conflict while updating question';
      const error = new MongoServerError(new Error(message));
      jest.spyOn(model, 'findById').mockReturnValueOnce(entity as any);
      jest.spyOn(repository, 'findOneById').mockReturnValueOnce(of(entity));
      jest
        .spyOn(model, 'findByIdAndUpdate')
        .mockReturnValueOnce(throwError(() => error) as any);

      // Act
      const result$ = repository.update(entityId, entity);

      // Assert
      result$.subscribe({
        error: (err) => {
          expect(err).toBeInstanceOf(MongoServerError);
          expect(err.message).toBe(message);
          expect(err.cause).toBeInstanceOf(Error);
          expect(err.cause.message).toBe(message);
          done();
        },
      });
    });
  });

  describe('delete', () => {
    it('should delete a Question', (done) => {
      // Arrange
      const entityId = '123';
      const entity = {} as unknown as QuestionMongoModel;
      jest.spyOn(model, 'findById').mockReturnValueOnce(entity as any);
      jest.spyOn(repository, 'findOneById').mockReturnValueOnce(of(entity));
      jest
        .spyOn(model, 'findByIdAndDelete')
        .mockReturnValueOnce(of(entity) as any);

      // Act
      const result$ = repository.delete(entityId);

      // Assert
      result$.subscribe({
        next: (result) => {
          expect(result).toBe(entity);
          expect(model.findByIdAndDelete).toHaveBeenCalledWith({
            _id: entityId.toString(),
          });
          done();
        },
      });
    });

    it('should throw a MongoServerError when there is a conflict', (done) => {
      // Arrange
      const entityId = '123';
      const entity = {} as unknown as QuestionMongoModel;
      const message = 'Conflict while deleting question';
      const error = new MongoServerError(new Error(message));
      jest.spyOn(model, 'findById').mockReturnValueOnce(entity as any);
      jest.spyOn(repository, 'findOneById').mockReturnValueOnce(of(entity));
      jest
        .spyOn(model, 'findByIdAndDelete')
        .mockReturnValueOnce(throwError(() => error) as any);

      // Act
      const result$ = repository.delete(entityId);

      // Assert
      result$.subscribe({
        error: (err) => {
          expect(err).toBeInstanceOf(MongoServerError);
          expect(err.message).toBe(message);
          expect(err.cause).toBeInstanceOf(Error);
          expect(err.cause.message).toBe(message);
          done();
        },
      });
    });
  });

  describe('findAll', () => {
    it('should return all Questions', (done) => {
      // Arrange
      const entities = [
        {} as unknown as QuestionMongoModel,
        {} as unknown as QuestionMongoModel,
      ];
      jest.spyOn(model, 'find').mockReturnValueOnce({
        exec: jest.fn().mockResolvedValueOnce(entities),
      } as any);
      // Act
      const result$ = repository.findAll();

      // Assert
      result$.subscribe({
        next: (result) => {
          expect(result).toBe(entities);
          expect(model.find).toHaveBeenCalledWith();
          done();
        },
      });
    });

    it('should throw a MongoServerError when there is a conflict', (done) => {
      // Arrange
      const message = 'Conflict while getting questions list';
      const error = new MongoServerError(new Error(message));
      jest.spyOn(model, 'find').mockReturnValueOnce({
        exec: jest.fn().mockRejectedValueOnce(error),
      } as any);

      // Act
      const result$ = repository.findAll();

      // Assert
      result$.subscribe({
        error: (err) => {
          expect(err).toBeInstanceOf(MongoServerError);
          expect(err.message).toBe(message);
          expect(err.cause).toBeInstanceOf(Error);
          expect(err.cause.message).toBe(message);
          done();
        },
      });
    });
  });

  describe('findOneById', () => {
    it('should return a Question', (done) => {
      // Arrange
      const entityId = '123';
      const entity = {} as unknown as QuestionMongoModel;
      jest.spyOn(model, 'findById').mockReturnValueOnce(of(entity) as any);

      // Act
      const result$ = repository.findOneById(entityId);

      // Assert
      result$.subscribe({
        next: (result) => {
          expect(result).toBe(entity);
          expect(model.findById).toHaveBeenCalledWith({ _id: entityId });
          done();
        },
      });
    });

    it('should throw a MongoServerError when there is a conflict', (done) => {
      // Arrange
      const entityId = '123';
      const message = 'Conflict while getting question by id';
      const error = new MongoServerError(new Error(message));
      jest
        .spyOn(model, 'findById')
        .mockReturnValueOnce(throwError(() => error) as any);

      // Act
      const result$ = repository.findOneById(entityId);

      // Assert
      result$.subscribe({
        error: (err) => {
          expect(err).toBeInstanceOf(MongoServerError);
          expect(err.message).toBe(message);
          expect(err.cause).toBeInstanceOf(Error);
          expect(err.cause.message).toBe(message);
          done();
        },
      });
    });

    it('should throw a NotFoundException when there is no Question', (done) => {
      // Arrange
      const entityId = '123';
      const message = 'Question not found!';
      jest.spyOn(model, 'findById').mockReturnValueOnce(of(null) as any);

      // Act
      const result$ = repository.findOneById(entityId);

      // Assert
      result$.subscribe({
        error: (err) => {
          expect(err).toBeInstanceOf(NotFoundException);
          expect(err.message).toBe(message);
          done();
        },
      });
    });
  });

  describe('findAllByLevel', () => {
    it('should return all Questions', (done) => {
      // Arrange
      const entities = [
        {} as unknown as QuestionMongoModel,
        {} as unknown as QuestionMongoModel,
      ];
      jest.spyOn(model, 'find').mockReturnValueOnce({
        exec: jest.fn().mockResolvedValueOnce(entities),
      } as any);
      // Act
      const result$ = repository.findAllByLevel('1');

      // Assert
      result$.subscribe({
        next: (result) => {
          expect(result).toBe(entities);
          expect(model.find).toHaveBeenCalledWith({ level: '1' });
          done();
        },
      });
    });

    it('should throw a MongoServerError when there is a conflict', (done) => {
      // Arrange
      const message = 'Conflict while getting questions list';
      const error = new MongoServerError(new Error(message));
      jest.spyOn(model, 'find').mockReturnValueOnce({
        exec: jest.fn().mockRejectedValueOnce(error),
      } as any);

      // Act
      const result$ = repository.findAllByLevel('1');

      // Assert
      result$.subscribe({
        error: (err) => {
          expect(err).toBeInstanceOf(MongoServerError);
          expect(err.message).toBe(message);
          expect(err.cause).toBeInstanceOf(Error);
          expect(err.cause.message).toBe(message);
          done();
        },
      });
    });
  });
});
