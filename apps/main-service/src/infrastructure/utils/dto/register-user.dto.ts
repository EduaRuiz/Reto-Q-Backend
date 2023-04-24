import { IRegisterUserDto } from "@main-service/domain/dto/register-user.dto";
import { IsBoolean, IsDefined, IsEmail, IsIn, IsNotEmpty, IsString } from "class-validator";

export class RegisterUserDto implements IRegisterUserDto {

    @IsString()
    @IsDefined()
    @IsNotEmpty()
    fullName: string;

    @IsString()
    @IsDefined()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsString()
    @IsDefined()
    @IsNotEmpty()
    @IsIn(['1', '2', '3'])
    level: string;

    @IsBoolean()
    @IsDefined()
    @IsNotEmpty()
    available: boolean;

    @IsString()
    @IsDefined()
    @IsNotEmpty()
    @IsIn(['User', 'Admin'])
    role: string;
}