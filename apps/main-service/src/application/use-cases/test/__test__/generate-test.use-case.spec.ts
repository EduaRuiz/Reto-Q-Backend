import { of, throwError } from 'rxjs';
import { IUserDomainService, ITestDomainService } from '@main-service/domain/services';
import { TestDomainModel } from '@main-service/domain/models';
import { TestGeneratedDomainEvent } from '@main-service/domain/events/publishers';
import { BadRequestException } from '@nestjs/common';
import { GenerateTestUseCase } from '../generate-test.use-case';


describe('GenerateTestUseCase', () => {
    let generateTestUseCase: GenerateTestUseCase;
    let mockTestService: ITestDomainService;
    let mockUserService: IUserDomainService;
    let mockGeneratedTest: TestGeneratedDomainEvent;

    beforeEach(() => {
        mockUserService = {
            getUserByEmail: jest.fn(),
        } as any as IUserDomainService;
        mockGeneratedTest = {
            publish: jest.fn(),
        } as any as TestGeneratedDomainEvent;
        mockTestService = {
            getTest: jest.fn(),
            generateTest: jest.fn(),
            startTest: jest.fn(),
            getTestByUserAndLevel: jest.fn(),
        } as any as ITestDomainService;
        generateTestUseCase = new GenerateTestUseCase(mockTestService, mockUserService, mockGeneratedTest);
    });

    describe('execute', () => {
        const userEmail = 'test@example.com';
        const userId = 'user-id';
        const level = 'level';
        const date = new Date();
        const test = {
            _id: 'testId',
            user_id: 'userId',
            token: "CNTP-3875",
            level: "1",
            created_at: date,
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
        } as TestDomainModel;

        it('should throw BadRequestException if user is not available', (done) => {
            // Arrange
            jest
                .spyOn(mockUserService, 'getUserByEmail')
                .mockReturnValueOnce(throwError(() => new BadRequestException()));

            // Act
            generateTestUseCase.execute(userEmail).subscribe({
                error: (error) => {
                    // Assert
                    expect(error).toBeInstanceOf(BadRequestException);
                    expect(mockUserService.getUserByEmail).toHaveBeenCalledWith(userEmail);
                    expect(mockTestService.getTestByUserAndLevel).not.toHaveBeenCalled();
                    done();
                },
            });
        });

        it('should validate if a test already exists', (done) => {
            const user = {
                available: true,
                _id: userId,
                level: level,
                fullName: 'Cristian Tironi',
                email: 'user@example.com',
            };
            const test = {
                created_at: new Date(),
                questions: [{ answered: false }, { answered: true }],
            } as TestDomainModel;

            jest.spyOn(mockUserService, 'getUserByEmail').mockReturnValueOnce(of(user));
            jest.spyOn(mockTestService, 'getTestByUserAndLevel').mockReturnValueOnce(of(test));
            jest.spyOn(mockGeneratedTest, 'publish').mockImplementation();

            generateTestUseCase.execute(userEmail).subscribe({
                next: () => {
                    expect(mockUserService.getUserByEmail).toHaveBeenCalledWith(userEmail);
                    expect(mockTestService.getTestByUserAndLevel).toHaveBeenCalledWith(userId, level);
                    expect(mockGeneratedTest.publish).toHaveBeenCalledWith({ test, userEmail });
                    done();
                },
                error: (error) => done.fail(error),
            });
        });

        it('should generate a new test if a test does not exist', (done) => {
            const user = {
                available: true,
                _id: userId,
                level: level,
                fullName: 'Cristian Tironi',
                email: 'user@example.com',
            };

            jest.spyOn(mockUserService, 'getUserByEmail').mockReturnValueOnce(of(user));
            jest.spyOn(mockTestService, 'getTestByUserAndLevel').mockReturnValueOnce(of(null));
            jest.spyOn(mockTestService, 'generateTest').mockReturnValueOnce(
                of({
                    _id: 'testId',
                    user_id: 'userId',
                    token: 'CNTP-3875',
                    level: '1',
                    created_at: new Date(),
                    questions: [],
                } as TestDomainModel),
            );
            jest.spyOn(mockGeneratedTest, 'publish').mockImplementation();

            generateTestUseCase.execute(userEmail).subscribe({
                next: () => {
                    expect(mockUserService.getUserByEmail).toHaveBeenCalledWith(userEmail);
                    expect(mockTestService.getTestByUserAndLevel).toHaveBeenCalledWith(userId, level);
                    expect(mockTestService.generateTest).toHaveBeenCalledWith({
                        user_id: userId,
                        level: level,
                        created_at: expect.any(Date),
                        token: expect.any(String),
                        questions: [],
                    });
                    expect(mockGeneratedTest.publish).toHaveBeenCalledWith({
                        test: expect.any(Object),
                        userEmail,
                    });
                    done();
                },
                error: (error) => done.fail(error),
            });
        });
    });
});