import { Test, TestingModule } from '@nestjs/testing';
import { TestController } from '../test.controller';
import { TestDelegator } from '@main-service/application/delegators';
import { Observable } from 'rxjs';
import { TestGeneratedEventPublisher, TestFinishedEventPublisher } from '@main-service/infrastructure/messaging';
import { TestService, UserService, QuestionService } from '@main-service/infrastructure/persistance';
import { SendAnswerToTestDto } from '@main-service/infrastructure/utils';


jest.mock('@main-service/application/delegators');

describe('TestController', () => {
    let controller: TestController;
    let testService: TestService;
    let userService: UserService;
    let questionService: QuestionService;
    let testGeneratedEvent: TestGeneratedEventPublisher;
    let testFinishedEvent: TestFinishedEventPublisher;

    const _id = '641c65deff0153dd0f36bf5';

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                {
                    provide: TestService,
                    useValue: {},
                },
                {
                    provide: UserService,
                    useValue: {},
                },
                {
                    provide: QuestionService,
                    useValue: {},
                },
                {
                    provide: TestGeneratedEventPublisher,
                    useValue: {},
                },
                {
                    provide: TestFinishedEventPublisher,
                    useValue: {},
                },
                TestDelegator,
            ],
            controllers: [TestController],
        }).compile();
        controller = module.get<TestController>(TestController);
        testService = module.get<TestService>(TestService);
        userService = module.get<UserService>(UserService);
        questionService = module.get<QuestionService>(QuestionService);
        testGeneratedEvent = module.get<TestGeneratedEventPublisher>(
            TestGeneratedEventPublisher,
        );
        testFinishedEvent = module.get<TestFinishedEventPublisher>(
            TestFinishedEventPublisher,
        );
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    describe('generateTest', () => {
        it('should call delegate.toGenerateTest and delegate.execute', (done) => {
            const userEmail = 'test@test.com';
            const expectedResponse = { success: true, message: 'Test generated' };
            const spyToGenerateTest = jest.spyOn(
                (controller as any).delegate,
                'toGenerateTest',
            );
            const spyExecute = jest.spyOn(
                (controller as any).delegate,
                'execute',
            ).mockReturnValueOnce(new Observable((subscriber) => {
                subscriber.next(expectedResponse);
                subscriber.complete();
            }));

            controller
                .generateTest(userEmail)
                .subscribe((result) => {
                    expect(spyToGenerateTest).toHaveBeenCalled();
                    expect(spyExecute).toHaveBeenCalledWith(userEmail);
                    expect(result).toEqual(expectedResponse);
                    done();
                });
        });
    });

    describe('startTest', () => {
        it('should call delegate.toStartTest and delegate.execute', (done) => {
            const token = 'test-token';
            const expectedResponse = 'Test started';
            const spyToStartTest = jest.spyOn(
                (controller as any).delegate,
                'toStartTest',
            );
            const spyExecute = jest.spyOn(
                (controller as any).delegate,
                'execute',
            ).mockReturnValueOnce(new Observable((subscriber) => {
                subscriber.next(expectedResponse);
                subscriber.complete();
            }));

            controller
                .startTest(token)
                .subscribe((result) => {
                    expect(spyToStartTest).toHaveBeenCalled();
                    expect(spyExecute).toHaveBeenCalledWith(token);
                    expect(result).toEqual(expectedResponse);
                    done();
                });
        });
    });

    describe('finishTest', () => {
        it('should call delegate.toFinishTest and delegate.execute', (done) => {
            const token = 'testToken123';
            const expectedResponse = 'Test finished';
            const spyToFinishTest = jest.spyOn(
                (controller as any).delegate,
                'toFinishTest',
            );
            const spyExecute = jest.spyOn(
                (controller as any).delegate,
                'execute',
            ).mockReturnValueOnce(new Observable((subscriber) => {
                subscriber.next(expectedResponse);
                subscriber.complete();
            }));

            controller
                .finishTest(token)
                .subscribe((result) => {
                    expect(spyToFinishTest).toHaveBeenCalled();
                    expect(spyExecute).toHaveBeenCalledWith(token);
                    expect(result).toEqual(expectedResponse);
                    done();
                });
        });
    });

    describe('setAnswerToTest', () => {
        it('should call delegate.toSetAnswerToTest and delegate.execute', (done) => {
            const answer: SendAnswerToTestDto = {
                token: '1',
                questionSentence: '2',
                answer: ['B'],
            };
            const expectedResponse = 'Answer set';
            const spyToSetAnswerToTest = jest.spyOn(
                (controller as any).delegate,
                'toSetAnswerToTest',
            );
            const spyExecute = jest.spyOn(
                (controller as any).delegate,
                'execute',
            ).mockReturnValueOnce(new Observable((subscriber) => {
                subscriber.next(expectedResponse);
                subscriber.complete();
            }));

            controller
                .setAnswerToTest(answer)
                .subscribe((result) => {
                    expect(spyToSetAnswerToTest).toHaveBeenCalled();
                    expect(spyExecute).toHaveBeenCalledWith(answer);
                    expect(result).toEqual(expectedResponse);
                    done();
                });
        });
    });

    describe('getTest', () => {
        it('should call delegate.toGetTest and delegate.execute', (done) => {
            const token = 'some-token';
            const expectedResponse = 'Test fetched';
            const spyToGetTest = jest.spyOn((controller as any).delegate, 'toGetTest');
            const spyExecute = jest
                .spyOn((controller as any).delegate, 'execute')
                .mockReturnValueOnce(
                    new Observable<string>((subscriber) => {
                        subscriber.next(expectedResponse);
                        subscriber.complete();
                    }),
                );

            controller.getTest(token).subscribe((result) => {
                expect(spyToGetTest).toHaveBeenCalled();
                expect(spyExecute).toHaveBeenCalledWith(token);
                expect(result).toEqual(expectedResponse);
                done();
            });
        });
    });
});