import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { QuestionModel } from '../persistance/models';
import { Observable } from 'rxjs';
import { QuestionService } from '../persistance/services';
import { QuestionDelegator } from '@main-service/application/delegators';
import { NewQuestionDto, UpdateQuestionDto } from '../utils/dto';

@Controller('question')
export class QuestionController {
  private readonly delegate: QuestionDelegator;

  constructor(private readonly questionService: QuestionService) {
    this.delegate = new QuestionDelegator(this.questionService);
  }

  @Post('new')
  registerQuestion(@Body() entity: NewQuestionDto): Observable<QuestionModel> {
    this.delegate.toCreateQuestion();
    return this.delegate.execute(entity);
  }

  @Put('update/:id')
  updateQuestion(
    @Param('id') id: string,
    @Body() entity: UpdateQuestionDto,
  ): Observable<QuestionModel> {
    this.delegate.toUpdateQuestion();
    return this.delegate.execute(id, entity);
  }

  @Get('get/:id')
  getQuestionById(@Param('id') id: string): Observable<QuestionModel> {
    this.delegate.toGetQuestion();
    return this.delegate.execute(id);
  }

  @Delete('delete/:id')
  deleteQuestionById(@Param('id') id: string): Observable<boolean> {
    this.delegate.toDeleteQuestion();
    return this.delegate.execute(id);
  }

  @Get('get-all')
  getAllQuestions(): Observable<QuestionModel[]> {
    this.delegate.toGetAllQuestions();
    return this.delegate.execute();
  }
}
