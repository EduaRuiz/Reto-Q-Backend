import { Observable } from "rxjs";
import { Injectable } from "@nestjs/common";
import { IUseCase } from "@mail-sender-service/application";
import { IUserDomainService } from "@main-service/domain/services";
import { IUserDomainModel, UserDomainModel } from "@main-service/domain/models";

@Injectable()
export class UpdateUserUseCase implements IUseCase{

    constructor(
        private readonly userService: IUserDomainService,
    ) {}

    execute(id: string, entity: IUserDomainModel): Observable<UserDomainModel>{
        const newEntity = this.updateUser(entity)
        return this.userService.updateUser(id, newEntity);
    }

    private updateUser(entity : IUserDomainModel): UserDomainModel {
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
