import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Observable, catchError, from, iif, of, switchMap, throwError } from "rxjs";
import { MongoServerError } from "mongodb";
import { NotFoundException } from "@nestjs/common";
import { UserMongoModel } from "../models/user.mongo-model";
import { IRepositoryBase } from "./interfaces";

export class UserMongoRepository implements IRepositoryBase<UserMongoModel> {
    constructor(
        @InjectModel(UserMongoModel.name)
        private model: Model<UserMongoModel>,
    ) { }

    create(entity: UserMongoModel): Observable<UserMongoModel> {
        return from(this.model.create(entity)).pipe(
            catchError((error: MongoServerError) => {
                error.cause = new Error('Conflict while creating user');
                throw new MongoServerError(error);
            }),
        );
    }

    update(entityId: string, entity: UserMongoModel): Observable<UserMongoModel> {
        return this.findOneById(entityId).pipe(
            switchMap((test: UserMongoModel) => {
                return from(
                    this.model.findByIdAndUpdate(
                        { _id: entityId.toString() },
                        { ...test, ...entity, _id: entityId },
                        { new: true },
                    ),
                ).pipe(
                    catchError((error: MongoServerError) => {
                        error.cause = new Error('Conflict while updating user');
                        throw new MongoServerError(error);
                    }),
                );
            }),
        );
    }

    delete(entityId: string): Observable<UserMongoModel> {
        return this.findOneById(entityId).pipe(
            switchMap(() => {
                return from(
                    this.model.findByIdAndDelete({
                        _id: entityId.toString(),
                    }),
                ).pipe(
                    catchError((error: MongoServerError) => {
                        error.cause = new Error('Conflict while deleting user');
                        throw new MongoServerError(error);
                    }),
                );
            }),
        );
    }

    findAll(): Observable<UserMongoModel[]> {
        return from(this.model.find().exec()).pipe(
            catchError((error: MongoServerError) => {
                error.cause = new Error('Conflict while getting users list');
                throw new MongoServerError(error);
            }),
        );
    }

    findOneById(entityId: string): Observable<UserMongoModel> {
        return from(this.model.findById({ _id: entityId.toString() })).pipe(
            catchError((error: MongoServerError) => {
                error.cause = new Error('Conflict while getting user by id');
                throw new MongoServerError(error);
            }),
            switchMap((user: UserMongoModel) =>
                iif(
                    () => user === null,
                    throwError(() => new NotFoundException('User not found!')),
                    of(user),
                ),
            ),
        );
    }

    findOneByEmail(email: string): Observable<UserMongoModel> {
        return from(this.model.findOne({ email })).pipe(
            catchError((error: MongoServerError) => {
                error.cause = new Error('Conflict while getting user by email');
                throw new MongoServerError(error);
            }),
            switchMap((user: UserMongoModel) =>
                iif(
                    () => user === null,
                    throwError(() => new NotFoundException('User not found!')),
                    of(user),
                ),
            ),
        );
    }
}