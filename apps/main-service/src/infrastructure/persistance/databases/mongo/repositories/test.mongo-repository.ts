import {
  Observable,
  catchError,
  from,
  iif,
  of,
  switchMap,
  throwError,
} from 'rxjs';
import { TestMongoModel } from '../models/test.mongo-model';
import { IRepositoryBase } from './interfaces';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MongoServerError } from 'mongodb';
import { NotFoundException } from '@nestjs/common';

export class TestMongoRepository implements IRepositoryBase<TestMongoModel> {
  constructor(
    @InjectModel(TestMongoModel.name)
    private model: Model<TestMongoModel>,
  ) {}

  create(entity: TestMongoModel): Observable<TestMongoModel> {
    return from(this.model.create(entity)).pipe(
      catchError((error: MongoServerError) => {
        error.cause = new Error('Conflict while creating test');
        throw new MongoServerError(error);
      }),
    );
  }

  update(entityId: string, entity: TestMongoModel): Observable<TestMongoModel> {
    return this.findOneById(entityId).pipe(
      switchMap((test: TestMongoModel) => {
        return from(
          this.model.findByIdAndUpdate(
            { _id: entityId.toString() },
            { ...test, ...entity, _id: entityId },
            { new: true },
          ),
        ).pipe(
          catchError((error: MongoServerError) => {
            error.cause = new Error('Conflict while updating test');
            throw new MongoServerError(error);
          }),
        );
      }),
    );
  }

  delete(entityId: string): Observable<TestMongoModel> {
    return this.findOneById(entityId).pipe(
      switchMap(() => {
        return from(
          this.model.findByIdAndDelete({
            _id: entityId.toString(),
          }),
        ).pipe(
          catchError((error: MongoServerError) => {
            error.cause = new Error('Conflict while deleting test');
            throw new MongoServerError(error);
          }),
        );
      }),
    );
  }

  findAll(): Observable<TestMongoModel[]> {
    return from(this.model.find().exec()).pipe(
      catchError((error: MongoServerError) => {
        error.cause = new Error('Conflict while getting tests list');
        throw new MongoServerError(error);
      }),
    );
  }

  findOneById(entityId: string): Observable<TestMongoModel> {
    return from(this.model.findById({ _id: entityId.toString() })).pipe(
      catchError((error: MongoServerError) => {
        error.cause = new Error('Conflict while getting test by id');
        throw new MongoServerError(error);
      }),
      switchMap((test: TestMongoModel) =>
        iif(
          () => test === null,
          throwError(() => new NotFoundException('Test not found!')),
          of(test),
        ),
      ),
    );
  }

  findOneByToken(token: string): Observable<TestMongoModel> {
    return from(this.model.findOne({ token })).pipe(
      catchError((error: MongoServerError) => {
        error.cause = new Error('Conflict while getting test by token');
        throw new MongoServerError(error);
      }),
      switchMap((test: TestMongoModel) =>
        iif(
          () => test === null,
          throwError(() => new NotFoundException('Test not found!')),
          of(test),
        ),
      ),
    );
  }

  findByLevelAndUserId(
    userId: string,
    level: string,
  ): Observable<TestMongoModel[]> {
    return from(this.model.find({ level, user_id: userId }).exec()).pipe(
      catchError((error: MongoServerError) => {
        error.cause = new Error(
          'Conflict while getting tests by level and userId',
        );
        throw new MongoServerError(error);
      }),
    );
  }
}
