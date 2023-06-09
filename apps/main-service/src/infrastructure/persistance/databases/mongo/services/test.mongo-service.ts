import {
  QuestionDomainModel,
  TestDomainModel,
} from '@main-service/domain/models';
import { ITestDomainService } from '@main-service/domain/services';
import { Observable, iif, map, of, switchMap, throwError } from 'rxjs';
import { QuestionMongoRepository, TestMongoRepository } from '../repositories';
import {
  GenerateTestTokenService,
  RandomQuestionService,
} from '@main-service/infrastructure/utils/services';
import { Injectable, NotFoundException } from '@nestjs/common';
import { TestMongoModel } from '../models';

@Injectable()
export class TestMongoService implements ITestDomainService {
  constructor(
    private readonly testRepo: TestMongoRepository,
    private readonly questionRepo: QuestionMongoRepository,
    private readonly randomQuestion: RandomQuestionService,
    private readonly token: GenerateTestTokenService,
  ) {}

  getTestByUserAndLevel(
    userId: string,
    level: string,
  ): Observable<TestDomainModel> {
    return this.testRepo.findByLevelAndUserId(userId, level).pipe(
      switchMap((tests: TestMongoModel[]) =>
        iif(
          () => tests.length === 0,
          throwError(() => new NotFoundException('Test not found!')),
          of(tests[0]),
        ),
      ),
    );
  }

  generateTest(test: TestDomainModel): Observable<TestDomainModel> {
    let token = this.token.generateToken();
    const currentTokenList: string[] = [];
    return this.testRepo.findAll().pipe(
      switchMap((tests: TestMongoModel[]) => {
        tests.map((test) => currentTokenList.push(test.token));
        while (currentTokenList.includes(token)) {
          token = this.token.generateToken();
        }
        return this.questionRepo.findAllByLevel(test.level).pipe(
          switchMap((questions) => {
            const selectedQuestions = this.randomQuestion.generate(questions);
            const testToSave = {
              ...test,
              token,
              questions: selectedQuestions.map(
                (question: QuestionDomainModel) => ({
                  question: question,
                  points: 0,
                  answered: false,
                }),
              ),
            };
            return this.testRepo.create(testToSave);
          }),
        );
      }),
    );
  }

  setAnswer(
    token: string,
    sentence: string,
    answer: string[],
  ): Observable<TestDomainModel> {
    return this.testRepo.findOneByToken(token).pipe(
      switchMap((test: TestMongoModel) => {
        const questionAnswered = test.questions.find(
          (question) => question.question.sentence === sentence,
        );
        !questionAnswered.answered &&
          ((questionAnswered.answered = true),
          (questionAnswered.points =
            JSON.stringify(questionAnswered.question.answer) ===
            JSON.stringify(answer)
              ? 2
              : 0));
        test.questions = test.questions.map((question) =>
          question.question.sentence === sentence ? questionAnswered : question,
        );
        return this.testRepo.update(test._id, test).pipe(
          map((test: TestMongoModel) => {
            test.questions = test.questions.map((question) => {
              delete question.question.answer;
              return question;
            });
            return test;
          }),
        );
      }),
    );
  }

  getTest(token: string): Observable<TestDomainModel> {
    return this.testRepo.findOneByToken(token).pipe(
      map((test: TestMongoModel) => {
        test.questions = test.questions.map((question) => {
          delete question.question.answer;
          return question;
        });
        return test;
      }),
    );
  }

  startTest(token: string): Observable<TestDomainModel> {
    return this.testRepo.findOneByToken(token).pipe(
      switchMap((test: TestMongoModel) => {
        test.started_at = new Date();
        return this.testRepo.update(test._id, test);
      }),
    );
  }
}
