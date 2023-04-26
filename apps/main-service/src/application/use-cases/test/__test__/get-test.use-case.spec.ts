import { BadRequestException } from '@nestjs/common';
import { Observable, of, throwError } from 'rxjs';
import { ITestDomainService } from '@main-service/domain/services';
import { TestDomainModel } from '@main-service/domain/models';
import { GetTestUseCase } from '../get-test.use-case';

describe('GetTestUseCase', () => {
    let useCase: GetTestUseCase;
    let service: ITestDomainService;

    beforeEach(() => {
        service = {
            getTest: jest.fn(),
        } as any as ITestDomainService;
        useCase = new GetTestUseCase(service);
    });

    it('should be defined', () => {
        expect(useCase).toBeDefined();
    });

    it('should throw BadRequestException when 24 hours limit exceeded', (done) => {
        const testToken = 'testToken';
        const now = new Date();
        const mockData: TestDomainModel = {
            _id: 'testId',
            user_id: 'userId',
            token: "CNTP-3875",
            level: "1",
            created_at: new Date(now.getTime() - 25 * 60 * 60 * 1000), // set created_at to be 25 hours ago
            started_at: now,
            questions: [],
        };
        jest.spyOn(service, 'getTest').mockReturnValue(of(mockData));

        const result = useCase.execute(testToken);

        result.subscribe({
            error: (error) => {
                expect(error).toBeInstanceOf(BadRequestException);
                expect(error.message).toBe('Time 24 hours limit exceeded');
                done();
            },
        });
    });

    it('should throw BadRequestException when 1 hour time to finish test is complete', (done) => {
        const testToken = 'testToken';
        const now = new Date();
        const mockData: TestDomainModel = {
            _id: 'testId',
            user_id: 'userId',
            token: "CNTP-3875",
            level: "1",
            created_at: now,
            started_at: new Date(now.getTime() - 61 * 60 * 1000), // set started_at to be 61 minutes ago
            questions: [],
        };
        jest.spyOn(service, 'getTest').mockReturnValue(of(mockData));

        const result = useCase.execute(testToken);

        result.subscribe({
            error: (error) => {
                expect(error).toBeInstanceOf(BadRequestException);
                expect(error.message).toBe('Time 1 hour to finished the test is complete');
                done();
            },
        });
    });


    it('should return the test when it has not exceeded the time limits', (done) => {
        const test: TestDomainModel = {
            _id: 'testId',
            user_id: 'userId',
            token: "CNTP-3875",
            level: "1",
            questions: [
                {
                    question: {
                        _id: "6445dd2187ccd7fd3c489284",
                        type: "unique",
                        topic: "Arquitectura Empresarial",
                        level: "1",
                        sentence: "¿Qué patrón arquitectónico se enfoca en la separación de responsabilidades y la escalabilidad del código?",
                        options: [
                            "Arquitectura limpia",
                            "Patrón MVC",
                            "Patrón Singleton",
                            "Patrón Factory"
                        ],
                        answer: [
                            "Arquitectura limpia",
                        ],
                    },
                    points: 2,
                    answered: true,
                },
                {
                    question: {
                        _id: "6445dd2187ccd7fd3c489284",
                        type: "unique",
                        topic: "Arquitectura Empresarial",
                        level: "1",
                        sentence: "¿Qué patrón arquitectónico se enfoca en la separación de responsabilidades y la escalabilidad del código?",
                        options: [
                            "Arquitectura limpia",
                            "Patrón MVC",
                            "Patrón Singleton",
                            "Patrón Factory"
                        ],
                        answer: [
                            "Arquitectura limpia",
                        ],
                    },
                    points: 2,
                    answered: true,
                },
            ],
            created_at: new Date(),
            started_at: new Date(Date.now() - 30 * 60 * 1000),
        };

        jest.spyOn(service, 'getTest').mockReturnValue(of(test));

        useCase.execute('test-token').subscribe((result) => {
            expect(result).toBe(test);
            expect(service.getTest).toHaveBeenCalledWith('test-token');
            done();
        });
    });
});