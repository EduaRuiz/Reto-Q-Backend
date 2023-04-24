import { Observable, catchError, mergeMap, of } from "rxjs";
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { IUseCase } from "@mail-sender-service/application";
import { IUserDomainService } from "@main-service/domain/services";
import { UserDomainModel } from "@main-service/domain/models";
@Injectable()
export class GetUserByEmailUseCase implements IUseCase {

    constructor(
        private readonly userService: IUserDomainService,
    ) { }

    execute(email: string): Observable<UserDomainModel> {
        return of(email).pipe(
            mergeMap(() => {
                return this.userService.getUserByEmail(email);
            }),
            catchError((error: Error) => {
                throw new InternalServerErrorException(`${error.message}`);
            })
        );
    }
}