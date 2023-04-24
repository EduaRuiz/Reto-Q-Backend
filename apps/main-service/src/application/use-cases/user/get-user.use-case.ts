import { Observable, catchError, mergeMap, of } from "rxjs";
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { IUseCase } from "@mail-sender-service/application";
import { IUserDomainService } from "@main-service/domain/services";
import { UserDomainModel } from "@main-service/domain/models";

@Injectable()
export class GetUserUseCase implements IUseCase{

    constructor(
        private readonly userService: IUserDomainService,
    ) { }

    execute(id: string): Observable<UserDomainModel> {
        return of(id).pipe(
            mergeMap(() => {
                return this.userService.getUserById(id);
            }),
            catchError((error: Error) => {
                throw new InternalServerErrorException(`${error.message}`);
            })
        );
    }
}