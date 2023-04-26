import { IUpdateQuestionDomainDto } from '@main-service/domain/dto';
import {
  IsOptional,
  IsString,
  IsNotEmpty,
  IsDefined,
  IsIn,
  ArrayMinSize,
} from 'class-validator';

export class UpdateQuestionDto implements IUpdateQuestionDomainDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  topic?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  @IsIn(['1', '2', '3'])
  level?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  @IsIn(['multiple', 'unique', 'truefalse'])
  type?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  sentence?: string;

  @IsOptional()
  @ArrayMinSize(1)
  @IsDefined({ each: true })
  @IsNotEmpty({ each: true })
  @IsString({ each: true })
  options?: string[];

  @IsOptional()
  @ArrayMinSize(1)
  @IsDefined({ each: true })
  @IsNotEmpty({ each: true })
  @IsString({ each: true })
  answer?: string[];
}
