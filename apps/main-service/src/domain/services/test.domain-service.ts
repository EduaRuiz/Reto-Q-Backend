import { Observable } from 'rxjs';
import { TestDomainModel } from '../models';

export interface ITestDomainService {
  generateTest(test: TestDomainModel): Observable<TestDomainModel>;
  setAnswer(token: string): Observable<TestDomainModel>;
  getTest(token: string): Observable<TestDomainModel>;
  startTest(token: string): Observable<TestDomainModel>;
}
