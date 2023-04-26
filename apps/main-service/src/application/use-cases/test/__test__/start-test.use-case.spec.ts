import { ITestDomainService } from '@main-service/domain/services';
import { TestDomainModel } from '@main-service/domain/models';
import { BadRequestException } from '@nestjs/common';
import { of } from 'rxjs';
import { StartTestUseCase } from '../start-test.use-case';

describe('StartTestUseCase', () => {
    let startTestUseCase: StartTestUseCase;
    let testService: ITestDomainService;

    beforeEach(() => {
        testService = {
            getTest: jest.fn(),
            startTest: jest.fn(),
        } as any as ITestDomainService;
        startTestUseCase = new StartTestUseCase(testService);
    });

    describe('execute', () => {
        const token = '123456';

        it('should throw BadRequestException if 24-hour limit is exceeded', (done) => {
            const test: TestDomainModel = {
                _id: 'testId',
                user_id: 'userId',
                token: "CNTP-3875",
                level: "1",
                created_at: new Date(Date.now() - 25 * 60 * 60 * 1000),
                started_at: null,
                questions: [],
            };
            jest.spyOn(testService, 'getTest').mockReturnValueOnce(of(test));

            startTestUseCase.execute(token).subscribe({
                error: (error) => {
                    expect(error).toBeInstanceOf(BadRequestException);
                    expect(error.message).toBe('Time 24hours limit exceeded');
                    done();
                },
            });
        });

        it('should throw BadRequestException if 1-hour timer is exceeded', (done) => {
            const test: TestDomainModel = {
                _id: 'testId',
                user_id: 'userId',
                token: "CNTP-3875",
                level: "1",
                created_at: new Date(),
                started_at: new Date(Date.now() - 61 * 60 * 1000),
                questions: [],
            };
            jest.spyOn(testService, 'getTest').mockReturnValueOnce(of(test));

            startTestUseCase.execute(token).subscribe({
                error: (error) => {
                    expect(error).toBeInstanceOf(BadRequestException);
                    expect(error.message).toBe(
                        'Time 1 hour to finished the test is complete',
                    );
                    done();
                },
            });
        });

        it('should return "Test has already started!" if test is already started', (done) => {
            const test: TestDomainModel = {
                _id: 'testId',
                user_id: 'userId',
                token: "CNTP-3875",
                level: "1",
                created_at: new Date(),
                started_at: new Date(),
                questions: [],
            };
            jest.spyOn(testService, 'getTest').mockReturnValueOnce(of(test));

            startTestUseCase.execute(token).subscribe((response) => {
                expect(response).toBe('Test has already started!');
                done();
            });
        });

        it('should start the test successfully if conditions are met', (done) => {
            const test: TestDomainModel = {
                _id: 'testId',
                user_id: 'userId',
                token: "CNTP-3875",
                level: "1",
                created_at: new Date(),
                started_at: null,
                questions: [],
            };
            jest.spyOn(testService, 'getTest').mockReturnValueOnce(of(test));
            jest.spyOn(testService, 'startTest').mockReturnValueOnce(of(null));

            startTestUseCase.execute(token).subscribe((response) => {
                expect(response).toBe('Test started successfully');
                done();
            });
        });
    });
});