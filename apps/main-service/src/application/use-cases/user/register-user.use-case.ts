import { Injectable } from "@nestjs/common";
import { Observable } from 'rxjs';
import { IUseCase } from "../interface";
import { IUserDomainService } from "@main-service/domain/services";
import { UserDomainModel } from "@main-service/domain/models";
import { IRegisterUserDto } from "@main-service/domain/dto/register-user.dto";

@Injectable()
export class RegisterUserUseCase implements IUseCase {

    constructor(
        private readonly userService: IUserDomainService,
    ) { }

    execute(entity: IRegisterUserDto): Observable<UserDomainModel> {
        return this.userService.registerUser(entity);
    }
}