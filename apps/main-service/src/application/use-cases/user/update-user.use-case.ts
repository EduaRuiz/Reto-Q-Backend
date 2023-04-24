import { Observable } from "rxjs";
import { Injectable } from "@nestjs/common";
import { IUseCase } from "@mail-sender-service/application";
import { IUserDomainService } from "@main-service/domain/services";
import { IUserDomainModel, UserDomainModel } from "@main-service/domain/models";
import { IUpdateUserDto } from "@main-service/domain/dto/update-user.dto";

@Injectable()
export class UpdateUserUseCase implements IUseCase{

    constructor(
        private readonly userService: IUserDomainService,
    ) {}

    execute(id: string, entity: IUpdateUserDto): Observable<UserDomainModel>{
        const newEntity = this.updateUser(entity)
        return this.userService.updateUser(id, newEntity);
    }

    private updateUser(entity : IUpdateUserDto): UserDomainModel {
        const {
            level,
            available,
        } = entity

        const user = new UserDomainModel()
        user.available = available
        user.level = level
        return user
    }

}
