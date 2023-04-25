import { IUseCase } from "@mail-sender-service/application";
import { GetUserByEmailUseCase, GetUserUseCase, RegisterUserUseCase, UpdateUserUseCase } from "@main-service/application/use-cases";
import { IUserDomainService } from "@main-service/domain/services";
import { Observable } from "rxjs";

export class UserDelegator implements IUseCase {
    private delegate: IUseCase;

    constructor(
        private readonly userService: IUserDomainService,
    ) { }

    execute<Response>(...args: any[]): Observable<Response> {
        return this.delegate.execute(...args);
    }

    toRegisterUser(): void {
        this.delegate = new RegisterUserUseCase(this.userService);
    }

    toUpdateUser(): void {
        this.delegate = new UpdateUserUseCase(this.userService);
    }

    toGetUser(): void {
        this.delegate = new GetUserUseCase(this.userService);
    }

    toGetUserByEmail(): void {
        this.delegate = new GetUserByEmailUseCase(this.userService);
    }
}