import { TestDelegator } from '../test-delegator';
import {
    IQuestionDomainService,
    ITestDomainService,
    IUserDomainService,
} from '@main-service/domain/services';
import {
    TestGeneratedDomainEvent,
    TestFinishedDomainEvent,
} from '@main-service/domain/events/publishers';
import {
    GenerateTestUseCase,
    StartTestUseCase,
    FinishTestUseCase,
    SetAnswerToTestUseCase,
    GetTestUseCase,
} from '../../use-cases';

describe('TestDelegator', () => {
    let testDelegator: TestDelegator;
    let userService: IUserDomainService;
    let questionService: IQuestionDomainService;
    let testService: ITestDomainService;
    let testGeneratedEvent: TestGeneratedDomainEvent;
    let testFinishedEvent: TestFinishedDomainEvent;

    beforeEach(() => {
        userService = {} as IUserDomainService;
        questionService = {} as IQuestionDomainService;
        testService = {} as ITestDomainService;
        testGeneratedEvent = {} as TestGeneratedDomainEvent;
        testFinishedEvent = {} as TestFinishedDomainEvent;

        testDelegator = new TestDelegator(
            userService,
            questionService,
            testService,
            testGeneratedEvent,
            testFinishedEvent,
        );
    });

    it('should set delegate to GenerateTestUseCase when toGenerateTest is called', () => {
        testDelegator.toGenerateTest();

        expect(testDelegator['delegate']).toBeInstanceOf(GenerateTestUseCase);
    });

    it('should set delegate to StartTestUseCase when toStartTest is called', () => {
        testDelegator.toStartTest();

        expect(testDelegator['delegate']).toBeInstanceOf(StartTestUseCase);
    });

    it('should set delegate to FinishTestUseCase when toFinishTest is called', () => {
        testDelegator.toFinishTest();

        expect(testDelegator['delegate']).toBeInstanceOf(FinishTestUseCase);
    });

    it('should set delegate to SetAnswerToTestUseCase when toSetAnswerToTest is called', () => {
        testDelegator.toSetAnswerToTest();

        expect(testDelegator['delegate']).toBeInstanceOf(SetAnswerToTestUseCase);
    });

    it('should set delegate to GetTestUseCase when toGetTest is called', () => {
        testDelegator.toGetTest();

        expect(testDelegator['delegate']).toBeInstanceOf(GetTestUseCase);
    });

    it('should call the execute method of delegate when execute is called on TestDelegator', () => {
        const mockResponse = {} as any;
        const mockDelegate = { execute: jest.fn(() => mockResponse) };
        testDelegator['delegate'] = mockDelegate;

        const result = testDelegator.execute<any>('arg1', 'arg2');

        expect(mockDelegate.execute).toHaveBeenCalledWith('arg1', 'arg2');
        expect(result).toBe(mockResponse);
    });
});