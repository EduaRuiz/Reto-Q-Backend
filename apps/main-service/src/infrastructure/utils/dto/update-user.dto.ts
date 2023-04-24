import { IUpdateUserDto } from "@main-service/domain/dto/update-user.dto";
import { IsBoolean, IsDefined, IsIn, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UpdateUserDto implements IUpdateUserDto {
    @IsOptional()
    @IsString()
    @IsDefined()
    @IsNotEmpty()
    @IsIn(['1', '2', '3'])
    level?: string;
    @IsOptional()
    @IsBoolean()
    @IsDefined()
    @IsNotEmpty()
    available?: boolean;
}