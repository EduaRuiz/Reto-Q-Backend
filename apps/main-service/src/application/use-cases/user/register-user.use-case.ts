import { Injectable  } from "@nestjs/common";
import { Observable } from 'rxjs';
import { IUseCase } from "../interface";
import { IUserDomainService } from "@main-service/domain/services";
import { IUserDomainModel, UserDomainModel } from "@main-service/domain/models";

@Injectable()
export class RegisterUserUseCase implements IUseCase {

    constructor (
        private readonly userService: IUserDomainService,
    ) {}

    execute(entity : IUserDomainModel): Observable<UserDomainModel>{
        const newEntity = this.createUserModel(entity)
        return this.userService.registerUser(newEntity);
    }


    private createUserModel(entity : IUserDomainModel): UserDomainModel {
        const {
            fullName,
            email,
            level,
            available,
            role,
        } = entity

        return new UserDomainModel({
            fullName: fullName,
            email: email,
            level: level,
            available: available,
            role: role,
        })
    }
}