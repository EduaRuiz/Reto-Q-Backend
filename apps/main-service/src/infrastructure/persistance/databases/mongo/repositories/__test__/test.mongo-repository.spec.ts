import { Model } from 'mongoose';
import { MongoServerError } from 'mongodb';
import { of, throwError } from 'rxjs';
import { getModelToken } from '@nestjs/mongoose';
import { TestMongoRepository } from '..';
import { TestMongoModel } from '../../models';
import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';

describe('TestMongoRepository', () => {
  let repository: TestMongoRepository;
  let model: Model<TestMongoModel>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TestMongoRepository,
        {
          provide: getModelToken(TestMongoModel.name),
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

    repository = module.get<TestMongoRepository>(TestMongoRepository);
    model = module.get<Model<TestMongoModel>>(
      getModelToken(TestMongoModel.name),
    );
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });

  describe('create', () => {
    it('should create a Test', (done) => {
      // Arrange
      const entity = {} as unknown as TestMongoModel;
      const createdTest = { ...entity } as unknown as TestMongoModel;
      jest.spyOn(model, 'create').mockReturnValueOnce(of(createdTest) as any);

      // Act
      const result$ = repository.create(entity);

      // Assert
      result$.subscribe({
        next: (result) => {
          expect(result).toBe(createdTest);
          expect(model.create).toHaveBeenCalledWith(entity);
          done();
        },
      });
    });

    it('should throw a MongoServerError when there is a conflict', (done) => {
      // Arrange
      const entity: TestMongoModel = {} as any;
      const message = 'Conflict while creating test';
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
    it('should update a Test', (done) => {
      // Arrange
      const entityId = '123';
      const entity = {} as unknown as TestMongoModel;
      const existingTest = { ...entity } as unknown as TestMongoModel;
      const updatedTest = { ...entity } as unknown as TestMongoModel;
      jest.spyOn(model, 'findById').mockReturnValueOnce(entity as any);
      jest.spyOn(repository, 'findOneById').mockReturnValueOnce(of(entity));
      jest
        .spyOn(model, 'findByIdAndUpdate')
        .mockReturnValueOnce(of(updatedTest) as any);

      // Act
      const result$ = repository.update(entityId, entity);

      // Assert
      result$.subscribe({
        next: (result) => {
          expect(result).toBe(updatedTest);
          expect(model.findByIdAndUpdate).toHaveBeenCalledWith(
            { _id: entityId.toString() },
            { ...existingTest, ...entity, _id: entityId },
            { new: true },
          );
          done();
        },
      });
    });

    it('should throw a MongoServerError when there is a conflict', (done) => {
      // Arrange
      const entityId = '123';
      const entity = {} as unknown as TestMongoModel;
      const message = 'Conflict while updating test';
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
    it('should delete a Test', (done) => {
      // Arrange
      const entityId = '123';
      const entity = {} as unknown as TestMongoModel;
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
      const entity = {} as unknown as TestMongoModel;
      const message = 'Conflict while deleting test';
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
    it('should return all Tests', (done) => {
      // Arrange
      const entities = [
        {} as unknown as TestMongoModel,
        {} as unknown as TestMongoModel,
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
      const message = 'Conflict while getting tests list';
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
    it('should return a Test', (done) => {
      // Arrange
      const entityId = '123';
      const entity = {} as unknown as TestMongoModel;
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
      const message = 'Conflict while getting test by id';
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

    it('should throw a NotFoundException when there is no Test', (done) => {
      // Arrange
      const entityId = '123';
      const message = 'Test not found!';
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

  describe('findOneByToken', () => {
    it('should return a Test', (done) => {
      // Arrange
      const entityToken = '123';
      const entity = {} as unknown as TestMongoModel;
      jest.spyOn(model, 'findOne').mockReturnValueOnce(of(entity) as any);

      // Act
      const result$ = repository.findOneByToken(entityToken);

      // Assert
      result$.subscribe({
        next: (result) => {
          expect(result).toBe(entity);
          expect(model.findOne).toHaveBeenCalledWith({ token: entityToken });
          done();
        },
      });
    });

    it('should throw a MongoServerError when there is a conflict', (done) => {
      // Arrange
      const entityToken = '123';
      const message = 'Conflict while getting test by token';
      const error = new MongoServerError(new Error(message));
      jest
        .spyOn(model, 'findOne')
        .mockReturnValueOnce(throwError(() => error) as any);

      // Act
      const result$ = repository.findOneByToken(entityToken);

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

    it('should throw a NotFoundException when there is no Test', (done) => {
      // Arrange
      const entityToken = '123';
      const message = 'Test not found!';
      jest.spyOn(model, 'findOne').mockReturnValueOnce(of(null) as any);

      // Act
      const result$ = repository.findOneByToken(entityToken);

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

  describe('findByLevelAndUserId', () => {
    it('should return all Tests', (done) => {
      // Arrange
      const entityUserId = '123';
      const entityLevel = '1';
      const entities = [
        {} as unknown as TestMongoModel,
        {} as unknown as TestMongoModel,
      ];
      jest.spyOn(model, 'find').mockReturnValueOnce({
        exec: jest.fn().mockResolvedValueOnce(entities),
      } as any);
      // Act
      const result$ = repository.findByLevelAndUserId(
        entityUserId,
        entityLevel,
      );

      // Assert
      result$.subscribe({
        next: (result) => {
          expect(result).toBe(entities);
          expect(model.find).toHaveBeenCalledWith({
            level: '1',
            user_id: '123',
          });
          done();
        },
      });
    });

    it('should throw a MongoServerError when there is a conflict', (done) => {
      // Arrange
      const entityUserId = '123';
      const entityLevel = '1';
      const message = 'Conflict while getting tests by level and userId';
      const error = new MongoServerError(new Error(message));
      jest.spyOn(model, 'find').mockReturnValueOnce({
        exec: jest.fn().mockRejectedValueOnce(error),
      } as any);

      // Act
      const result$ = repository.findByLevelAndUserId(
        entityUserId,
        entityLevel,
      );

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
