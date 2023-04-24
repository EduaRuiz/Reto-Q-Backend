import { QuestionMongoService } from '../databases';
import { Injectable } from '@nestjs/common';

@Injectable()
export class QuestionService extends QuestionMongoService {}
