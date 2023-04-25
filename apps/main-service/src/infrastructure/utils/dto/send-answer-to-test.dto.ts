import { ISendAnswerToTestDto } from '@main-service/domain/dto';
import { ArrayMinSize, IsDefined, IsNotEmpty, IsString } from 'class-validator';

export class SendAnswerToTestDto implements ISendAnswerToTestDto {
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  token: string;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  questionSentence: string;

  @ArrayMinSize(1)
  @IsDefined({ each: true })
  @IsNotEmpty({ each: true })
  @IsString({ each: true })
  answer: string[];
}
