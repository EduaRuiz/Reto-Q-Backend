import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { UserDelegator } from '@main-service/application/delegators';
import { UserService } from '../persistance/services';
import { UserModel } from '../persistance/models';
import { IUserDomainModel } from '@main-service/domain/models';
import { Observable } from 'rxjs';

@Controller('user')
export class UserController {
  private readonly delegate: UserDelegator;

  constructor(
    private readonly userService: UserService
    ) {
      this.delegate = new UserDelegator(this.userService);
    }

    @Post('/registerUser')
    registerUser(@Body() entity: IUserDomainModel): Observable<UserModel> {
      this.delegate.toRegisterUser()
      return this.delegate.execute(entity)
    }

    @Put('/updateUser/:id')
    updateuser(@Param('id') id: string, @Body() entity: IUserDomainModel): Observable<UserModel> {
      this.delegate.toUpdateUser()
      return this.delegate.execute(id, entity)
    }

    @Get('/getUser/:id')
    getUserById(@Param('id') id: string): Observable<UserModel> {
      this.delegate.toGetUser()
      return this.delegate.execute(id)
    }

    @Get('/getUserByEmail/:email')
    getUserByEmail(@Param('email') email: string): Observable<UserModel> {
      this.delegate.toGetUserByEmail()
      return this.delegate.execute(email)
    }
}
