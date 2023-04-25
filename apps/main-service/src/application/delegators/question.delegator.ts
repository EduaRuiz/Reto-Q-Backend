import { Observable } from 'rxjs';
import { IUseCase } from '../use-cases/interface/use-case.interface';
import {
  CreateQuestionUseCase,
  DeleteQuestionUseCase,
  GetAllQuestionsUseCase,
  GetQuestionUseCase,
  UpdateQuestionUseCase,
  ValidateAnswerUseCase,
} from '../use-cases/question';
import { IQuestionDomainService } from '@main-service/domain/services';

export class QuestionDelegator implements IUseCase {
  private delegate: IUseCase;

  constructor(
    private readonly iQuestionDomainService: IQuestionDomainService,
  ) {}

  execute(...args: any[]): Observable<any> {
    return this.delegate.execute(...args);
  }

  toValidateAnswer(): void {
    this.delegate = new ValidateAnswerUseCase(this.iQuestionDomainService);
  }

  toCreateQuestion(): void {
    this.delegate = new CreateQuestionUseCase(this.iQuestionDomainService);
  }

  toUpdateQuestion(): void {
    this.delegate = new UpdateQuestionUseCase(this.iQuestionDomainService);
  }

  toDeleteQuestion(): void {
    this.delegate = new DeleteQuestionUseCase(this.iQuestionDomainService);
  }

  toGetQuestion(): void {
    this.delegate = new GetQuestionUseCase(this.iQuestionDomainService);
  }

  toGetAllQuestions(): void {
    this.delegate = new GetAllQuestionsUseCase(this.iQuestionDomainService);
  }
}
