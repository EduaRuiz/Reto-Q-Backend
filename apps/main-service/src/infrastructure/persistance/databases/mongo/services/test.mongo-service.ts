import {
  QuestionDomainModel,
  TestDomainModel,
} from '@main-service/domain/models';
import { ITestDomainService } from '@main-service/domain/services';
import { Observable, switchMap } from 'rxjs';
import { TestMongoRepository } from '../repositories';
import { RandomQuestionService } from '@main-service/infrastructure/utils/services';

export class TestMongoService implements ITestDomainService {
  constructor(
    private readonly testRepo: TestMongoRepository,
    private readonly questionRepo: {
      getAll: () => Observable<QuestionDomainModel[]>;
      getAllByLevel: (level: string) => Observable<QuestionDomainModel[]>;
      getAllByLevelAndTopic: (
        level: number,
        topic: string,
      ) => Observable<QuestionDomainModel[]>;
    },
    private readonly randomQuestion: RandomQuestionService,
  ) {}

  generateTest(test: TestDomainModel): Observable<TestDomainModel> {
    const token = generateToken();
    return this.questionRepo.getAllByLevel(test.level).pipe(
      switchMap((questions) => {
        const selectedQuestions = this.randomQuestion.generate(questions);
        const testToSave = {
          ...test,
          token,
          questions: selectedQuestions.map((question: QuestionDomainModel) => ({
            question: question,
            points: 0,
            answered: false,
          })),
        };
        return this.testRepo.create(testToSave);
      }),
    );
  }

  setAnswer(token: string): Observable<TestDomainModel> {
    throw new Error('Method not implemented.');
  }
  getTest(token: string): Observable<TestDomainModel> {
    throw new Error('Method not implemented.');
  }
  startTest(token: string): Observable<TestDomainModel> {
    throw new Error('Method not implemented.');
  }
}

const generateToken = () => {
  const letters: string[] = [];
  while (letters.length < 4) {
    const letter = String.fromCharCode(Math.floor(Math.random() * 26) + 65);
    (letters.indexOf(letter) === -1 ||
      letters.filter((l) => l === letter).length <= 2) &&
      letters.push(letter);
  }
  const numbers: number[] = [];
  while (numbers.length < 4) {
    const num = Math.floor(Math.random() * 10);
    !numbers.includes(num) &&
      numbers.filter((n) => n === num).length <= 2 &&
      numbers.push(num);
  }
  return [...letters, , '-', ...numbers].join('');
};
