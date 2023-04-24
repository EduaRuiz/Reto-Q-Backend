import { IUserDomainService } from "@main-service/domain/services";
import { Injectable } from "@nestjs/common";
import { UserMongoRepository } from "../repositories/user.mongo-repository";
import { UserDomainModel } from "@main-service/domain/models";
import { Observable, map, switchMap } from "rxjs";
import { UserMongoModel } from "../models/user.mongo-model";

@Injectable()
export class UserMongoService implements IUserDomainService {
    constructor(
        private readonly userRepository: UserMongoRepository,
    ) { }

    getUserByEmail(email: string): Observable<UserDomainModel> {
        return this.userRepository.findOneByEmail(email)
    }
    registerUser(entity: UserDomainModel): Observable<UserDomainModel> {
        return this.userRepository.create(entity)
    }
    getUserById(id: string): Observable<UserDomainModel> {
        return this.userRepository.findOneById(id)
    }
    updateUser(id: string, entity: UserDomainModel): Observable<UserDomainModel> {
        return this.getUserById(id).pipe(
            switchMap((data: UserDomainModel) => {
                data.level = entity.level === undefined? data.level : entity.level;
                data.available = entity.available === undefined? data.available : entity.available;
                return this.userRepository.update(id, data).pipe(
                    map((updatedData: UserMongoModel) => {
                        const updatedUser: UserDomainModel = {
                            fullName: updatedData.fullName,
                            email: updatedData.email,
                            role: updatedData.role,
                            level: data.level,
                            available: data.available
                        };
                        return updatedUser;
                    })
                );
            })
        );
    }      
}