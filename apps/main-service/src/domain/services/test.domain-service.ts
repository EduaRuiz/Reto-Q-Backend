import { Observable } from 'rxjs';
import { TestDomainModel } from '../models';

export interface ITestDomainService {
  generateTest(test: TestDomainModel): Observable<TestDomainModel>;
  setAnswer(
    token: string,
    sentence: string,
    answer: string[],
  ): Observable<TestDomainModel>;
  getTest(token: string): Observable<TestDomainModel>;
  getTestByUserAndLevel(
    userId: string,
    level: string,
  ): Observable<TestDomainModel>;
  startTest(token: string): Observable<TestDomainModel>;
}
