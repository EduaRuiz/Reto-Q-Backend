import { Observable } from 'rxjs';
import { IUseCase } from './interface';
import { INewTestDto } from '@main-service/domain/dto';
import { ITestDomainService } from '@main-service/domain/services';

export class GenerateTest implements IUseCase {
  constructor(private readonly testService: ITestDomainService) {}
  execute(dto: INewTestDto): Observable<any> {
    return this.testService.generateTest(dto as any);
  }
}
