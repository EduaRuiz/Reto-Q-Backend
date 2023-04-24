import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { UserDelegator } from '@main-service/application/delegators';
import { UserService } from '../persistance/services';
import { UserModel } from '../persistance/models';
import { Observable } from 'rxjs';
import { UpdateUserDto } from '../utils/dto/update-user.dto';
import { RegisterUserDto } from '../utils/dto/register-user.dto';

@Controller('user')
export class UserController {
  private readonly delegate: UserDelegator;

  constructor(
    private readonly userService: UserService
    ) {
      this.delegate = new UserDelegator(this.userService);
    }

    @Post('/registerUser')
    registerUser(@Body() entity: RegisterUserDto): Observable<UserModel> {
      this.delegate.toRegisterUser()
      return this.delegate.execute(entity)
    }

    @Put('/updateUser/:id')
    updateuser(@Param('id') id: string, @Body() entity: UpdateUserDto): Observable<UserModel> {
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
