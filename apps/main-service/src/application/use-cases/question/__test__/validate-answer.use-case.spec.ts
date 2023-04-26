import { Observable, of } from 'rxjs';
import { ValidateAnswerUseCase } from '../validate-answer.use-case';
import { IQuestionDomainService, QuestionDomainModel } from '@main-service/domain';

describe('ValidateAnswerUseCase', () => {
    let useCase: ValidateAnswerUseCase;
    let service: IQuestionDomainService;

    beforeEach(() => {
        service = {
            getQuestionById: jest.fn(),
        } as any as IQuestionDomainService;
        useCase = new ValidateAnswerUseCase(service);
    });

    it('should be defined', () => {
        expect(useCase).toBeDefined();
    });

    it('should call service.getQuestionById and return correct result', (done) => {
        const id = '641c65deff0153dd0f36bf5';
        const answer = ['Verdadero'];
        const question: QuestionDomainModel = {
            topic: 'DDD',
            level: '1',
            type: 'VoF',
            sentence: 'Es un AgregadoRoot una entidad?',
            options: ['Verdadero', 'Falso'],
            answer: ['Verdadero']
        };
        jest.spyOn(service, 'getQuestionById').mockReturnValue(of(question));


        const result = useCase.execute(id, answer);


        expect(service.getQuestionById).toHaveBeenCalledWith(id);
        result.subscribe({
            next: (data) => {
                expect(data).toEqual(true);
                done();
            },
        });
    });

    it('should call service.getQuestionById and return incorrect result', (done) => {
        const id = '641c65deff0153dd0f36bf5';
        const answer = ['Falso'];
        const question: QuestionDomainModel = {
            topic: 'DDD',
            level: '1',
            type: 'VoF',
            sentence: 'Es un AgregadoRoot una entidad?',
            options: ['Verdadero', 'Falso'],
            answer: ['Verdadero']
        };
        jest.spyOn(service, 'getQuestionById').mockReturnValue(of(question));


        const result = useCase.execute(id, answer);


        expect(service.getQuestionById).toHaveBeenCalledWith(id);
        result.subscribe({
            next: (data) => {
                expect(data).toEqual(false);
                done();
            },
        });
    });
});