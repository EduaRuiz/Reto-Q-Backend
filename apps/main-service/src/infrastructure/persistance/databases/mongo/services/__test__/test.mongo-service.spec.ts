import { Test, TestingModule } from '@nestjs/testing';
import { of } from 'rxjs';
import { NotFoundException } from '@nestjs/common';
import {
    GenerateTestTokenService,
    RandomQuestionService,
} from '@main-service/infrastructure/utils/services';
import {
    QuestionMongoRepository,
    TestMongoRepository,
} from '../../repositories';
import { TestMongoService } from '../test.mongo-service';


describe('TestMongoService', () => {
    let service: TestMongoService;
    let testRepo: TestMongoRepository;
    let questionRepo: QuestionMongoRepository;
    let randomQuestion: RandomQuestionService;
    let token: GenerateTestTokenService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                TestMongoService,
                {
                    provide: TestMongoRepository,
                    useValue: {
                        findByLevelAndUserId: jest.fn(),
                    },
                },
                {
                    provide: QuestionMongoRepository,
                    useValue: {},
                },
                {
                    provide: RandomQuestionService,
                    useValue: {},
                },
                {
                    provide: GenerateTestTokenService,
                    useValue: {},
                },
            ],
        }).compile();

        service = module.get<TestMongoService>(TestMongoService);
        testRepo = module.get<TestMongoRepository>(TestMongoRepository);
        questionRepo = module.get<QuestionMongoRepository>(QuestionMongoRepository);
        randomQuestion = module.get<RandomQuestionService>(RandomQuestionService);
        token = module.get<GenerateTestTokenService>(GenerateTestTokenService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('getTestByUserAndLevel', () => {
        it('should throw a NotFoundException if test is not found', done => {
            const userId = '1234';
            const level = 'hard';

            jest.spyOn(testRepo, 'findByLevelAndUserId').mockReturnValueOnce(of([]));

            service.getTestByUserAndLevel(userId, level).subscribe({
                error: error => {
                    expect(error).toBeInstanceOf(NotFoundException);
                    expect(error.message).toBe('Test not found!');
                    done();
                },
            });
        });

        it('should return the test if it is found', done => {
            const date = new Date();
            const userId = '1234';
            const level = 'hard';
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
            };

            jest
                .spyOn(testRepo, 'findByLevelAndUserId')
                .mockReturnValueOnce(of([test]));

            service.getTestByUserAndLevel(userId, level).subscribe(result => {
                expect(result).toEqual(test);
                done();
            });
        });
    });
});