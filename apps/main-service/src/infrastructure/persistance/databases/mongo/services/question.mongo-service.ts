import {
  IQuestionDomainService,
  QuestionDomainModel,
} from '@main-service/domain';
import { Observable, map } from 'rxjs';
import { QuestionMongoRepository } from '../repositories';
import { Injectable } from '@nestjs/common';

@Injectable()
export class QuestionMongoService implements IQuestionDomainService {
  constructor(private readonly questionRepo: QuestionMongoRepository) {}

  createQuestion(
    question: QuestionDomainModel,
  ): Observable<QuestionDomainModel> {
    return this.questionRepo.create(question);
  }
  getQuestionById(id: string): Observable<QuestionDomainModel> {
    return this.questionRepo.findOneById(id);
  }
  getAllQuestions(): Observable<QuestionDomainModel[]> {
    return this.questionRepo.findAll();
  }
  updateQuestion(
    id: string,
    question: QuestionDomainModel,
  ): Observable<QuestionDomainModel> {
    return this.questionRepo.update(id, question);
  }
  deleteQuestion(Id: string): Observable<boolean> {
    return this.questionRepo.delete(Id).pipe(map(() => true));
  }
}
