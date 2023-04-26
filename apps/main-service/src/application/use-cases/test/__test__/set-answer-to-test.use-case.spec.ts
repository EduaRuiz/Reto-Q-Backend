import { Test, TestingModule } from '@nestjs/testing';
import { of } from 'rxjs';
import { TestDomainModel } from '@main-service/domain/models';
import { ITestDomainService } from '@main-service/domain/services';
import { ISendAnswerToTestDto } from '@main-service/domain/dto';
import { SetAnswerToTestUseCase } from '../set-anwer-to-test.use-case';

describe('SetAnswerToTestUseCase', () => {
    let useCase: SetAnswerToTestUseCase;
    let testService: ITestDomainService;

    beforeEach(() => {
        testService = {
            setAnswer: jest.fn(),
        } as any as ITestDomainService;
        useCase = new SetAnswerToTestUseCase(testService);
    });

    describe('execute', () => {
        it('should call testService.setAnswer and return TestDomainModel with question answers cleared', (done) => {
            // Arrange
            const dto: ISendAnswerToTestDto = {
                token: 'testToken',
                questionSentence: 'questionSentence',
                answer: [
                ],
            };
            const test: TestDomainModel = {
                _id: 'testId',
                user_id: 'userId',
                token: "CNTP-3875",
                level: "1",
                created_at: new Date(),
                started_at: new Date(),
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
                            ],
                        },
                        points: 2,
                        answered: true,
                    },
                ],
            };
            jest.spyOn(testService, 'setAnswer').mockReturnValue(of(test));

            // Act
            useCase.execute(dto).subscribe((result) => {
                // Assert
                expect(testService.setAnswer).toHaveBeenCalledWith(dto.token, dto.questionSentence, dto.answer);
                expect(result).toEqual({
                    ...test,
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
                                ],
                            },
                            points: 2,
                            answered: true,
                        },
                    ],
                });
                done();
            });
        });
    });
});