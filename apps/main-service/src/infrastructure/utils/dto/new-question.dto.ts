import { INewQuestionDomainDto } from '@main-service/domain/dto';
import {
  IsString,
  IsNotEmpty,
  IsDefined,
  IsIn,
  ArrayMinSize,
} from 'class-validator';

export class NewQuestionDto implements INewQuestionDomainDto {
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  topic: string;

  @IsString()
  @IsNotEmpty()
  @IsDefined()
  @IsIn(['1', '2', '3'])
  level: string;

  @IsString()
  @IsNotEmpty()
  @IsDefined()
  @IsIn(['multiple', 'unique', 'truefalse'])
  type: string;

  @IsString()
  @IsNotEmpty()
  @IsDefined()
  sentence: string;

  @ArrayMinSize(1)
  @IsDefined({ each: true })
  @IsNotEmpty({ each: true })
  @IsString({ each: true })
  options: string[];

  @ArrayMinSize(1)
  @IsDefined({ each: true })
  @IsNotEmpty({ each: true })
  @IsString({ each: true })
  answer: string[];
}
