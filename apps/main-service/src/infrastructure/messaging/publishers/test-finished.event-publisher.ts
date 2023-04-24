import { TestDomainModel } from '@main-service/domain';
import { TestFinishedDomainEvent } from '@main-service/domain/events/publishers';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';

@Injectable()
export class TestFinishedEventPublisher extends TestFinishedDomainEvent {
  constructor(@Inject('MAIN_SERVICE') private readonly proxy: ClientProxy) {
    super();
  }

  publish(event: {
    test: TestDomainModel;
    userEmail: string;
  }): Observable<{ test: TestDomainModel; userEmail: string }> {
    return this.proxy.emit('test-finished', JSON.stringify(event));
  }
}
