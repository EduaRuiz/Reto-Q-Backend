import {
  Observable,
  catchError,
  from,
  iif,
  of,
  switchMap,
  throwError,
} from 'rxjs';
import { QuestionMongoModel } from '../models';
import { IRepositoryBase } from './interfaces';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MongoServerError } from 'mongodb';
import { NotFoundException } from '@nestjs/common';

export class QuestionMongoRepository
  implements IRepositoryBase<QuestionMongoModel>
{
  constructor(
    @InjectModel(QuestionMongoModel.name)
    private model: Model<QuestionMongoModel>,
  ) {}

  create(entity: QuestionMongoModel): Observable<QuestionMongoModel> {
    return from(this.model.create(entity)).pipe(
      catchError((error: MongoServerError) => {
        error.cause = new Error('Conflict while creating question');
        throw new MongoServerError(error);
      }),
    );
  }

  update(
    entityId: string,
    entity: QuestionMongoModel,
  ): Observable<QuestionMongoModel> {
    return this.findOneById(entityId).pipe(
      switchMap((question: QuestionMongoModel) => {
        return from(
          this.model.findByIdAndUpdate(
            { _id: entityId.toString() },
            { ...question, ...entity, _id: entityId },
            { new: true },
          ),
        ).pipe(
          catchError((error: MongoServerError) => {
            error.cause = new Error('Conflict while updating question');
            throw new MongoServerError(error);
          }),
        );
      }),
    );
  }

  delete(entityId: string): Observable<QuestionMongoModel> {
    return this.findOneById(entityId).pipe(
      switchMap(() => {
        return from(
          this.model.findByIdAndDelete({
            _id: entityId.toString(),
          }),
        ).pipe(
          catchError((error: MongoServerError) => {
            error.cause = new Error('Conflict while deleting question');
            throw new MongoServerError(error);
          }),
        );
      }),
    );
  }

  findAll(): Observable<QuestionMongoModel[]> {
    return from(this.model.find().exec()).pipe(
      catchError((error: MongoServerError) => {
        error.cause = new Error('Conflict while getting questions list');
        throw new MongoServerError(error);
      }),
    );
  }

  findOneById(entityId: string): Observable<QuestionMongoModel> {
    return from(this.model.findById({ _id: entityId.toString() })).pipe(
      catchError((error: MongoServerError) => {
        error.cause = new Error('Conflict while getting question by id');
        throw new MongoServerError(error);
      }),
      switchMap((question: QuestionMongoModel) =>
        iif(
          () => question === null,
          throwError(() => new NotFoundException('Question not found!')),
          of(question),
        ),
      ),
    );
  }

  findAllByLevel(level: string): Observable<QuestionMongoModel[]> {
    return from(this.model.find({ level }).exec()).pipe(
      catchError((error: MongoServerError) => {
        error.cause = new Error('Conflict while getting questions list');
        throw new MongoServerError(error);
      }),
    );
  }
}
