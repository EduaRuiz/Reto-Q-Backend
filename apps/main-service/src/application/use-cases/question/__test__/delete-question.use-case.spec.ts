import { Observable } from 'rxjs';
import { IQuestionDomainService } from '@main-service/domain';
import { DeleteQuestionUseCase } from '../delete-question.use-case';

describe('DeleteUseCase', () => {
  let useCase: DeleteQuestionUseCase;
  let service: IQuestionDomainService;

  beforeEach(() => {
    service = {
      deleteQuestion: jest.fn(),
    } as any as IQuestionDomainService;
    useCase = new DeleteQuestionUseCase(service);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  it('should call service.delete', (done) => {

    const _id = '641c65deff0153dd0f36bf5';
    const mockData = true;
    const expectedData = true;
    const expectedInstanceType = Observable<boolean>;
    const stubDelete = jest.fn(
      () =>
        new Observable<boolean>((subscriber) => {
          subscriber.next(mockData);
          subscriber.complete();
        }),
    );
    jest.spyOn(service, 'deleteQuestion').mockReturnValue(stubDelete());


    const result = useCase.execute(_id);


    expect(result).toBeInstanceOf(expectedInstanceType);
    result.subscribe({
      next: (data) => {
        expect(data).toEqual(expectedData);
        done();
      },
    });
  });
});

