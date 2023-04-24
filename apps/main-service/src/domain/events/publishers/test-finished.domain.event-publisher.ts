import { TestDomainModel } from '@main-service/domain/models';
import { Observable } from 'rxjs';

export abstract class TestFinishedDomainEvent<
  Response = { test: TestDomainModel; userEmail: string },
> {
  abstract publish(inventoryMovement: Response): Observable<Response>;
}
