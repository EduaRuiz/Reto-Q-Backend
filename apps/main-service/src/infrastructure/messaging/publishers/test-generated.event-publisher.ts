import { TestDomainModel } from '@main-service/domain';
import { TestGeneratedDomainEvent } from '@main-service/domain/events/publishers';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';

@Injectable()
export class TestGeneratedEventPublisher extends TestGeneratedDomainEvent {
  constructor(@Inject('MAIN_SERVICE') private readonly proxy: ClientProxy) {
    super();
  }

  publish(event: {
    test: TestDomainModel;
    userEmail: string;
  }): Observable<{ test: TestDomainModel; userEmail: string }> {
    return this.proxy.emit('test-generated', JSON.stringify(event));
  }
}
