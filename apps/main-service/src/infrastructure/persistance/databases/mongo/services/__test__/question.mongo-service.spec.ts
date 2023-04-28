import { QuestionDomainModel } from '@main-service/domain/models';
import { of, throwError } from 'rxjs';
import { QuestionMongoService } from '..';

describe('QuestionMongoService', () => {
  // Tests that a question can be created successfully.
  it('test_create_question', async () => {
    const question = new QuestionDomainModel();
    question.topic = 'Math';
    question.level = 'Easy';
    question.type = 'Multiple Choice';
    question.sentence = 'What is 2+2?';
    question.options = ['3', '4', '5', '6'];
    question.answer = ['4'];

    const questionRepoMock = {
      create: jest.fn().mockReturnValue(of(question)),
    };

    const questionService = new QuestionMongoService(questionRepoMock as any);

    const result = await questionService.createQuestion(question).toPromise();

    expect(result).toEqual(question);
    expect(questionRepoMock.create).toHaveBeenCalledWith(question);
  });

  // Tests that a question can be retrieved by its ID.
  it('test_get_question_by_id', async () => {
    const question = new QuestionDomainModel();
    question._id = '123';
    question.topic = 'Math';
    question.level = 'Easy';
    question.type = 'Multiple Choice';
    question.sentence = 'What is 2+2?';
    question.options = ['3', '4', '5', '6'];
    question.answer = ['4'];

    const questionRepoMock = {
      findOneById: jest.fn().mockReturnValue(of(question)),
    };

    const questionService = new QuestionMongoService(questionRepoMock as any);

    const result = await questionService.getQuestionById('123').toPromise();

    expect(result).toEqual(question);
    expect(questionRepoMock.findOneById).toHaveBeenCalledWith('123');
  });

  // Tests that all questions can be retrieved successfully.
  it('test_get_all_questions', async () => {
    const questions = [new QuestionDomainModel(), new QuestionDomainModel()];
    questions[0]._id = '123';
    questions[0].topic = 'Math';
    questions[0].level = 'Easy';
    questions[0].type = 'Multiple Choice';
    questions[0].sentence = 'What is 2+2?';
    questions[0].options = ['3', '4', '5', '6'];
    questions[0].answer = ['4'];

    questions[1]._id = '456';
    questions[1].topic = 'Science';
    questions[1].level = 'Medium';
    questions[1].type = 'True or False';
    questions[1].sentence = 'The earth is flat.';
    questions[1].options = ['True', 'False'];
    questions[1].answer = ['False'];

    const questionRepoMock = {
      findAll: jest.fn().mockReturnValue(of(questions)),
    };

    const questionService = new QuestionMongoService(questionRepoMock as any);

    const result = await questionService.getAllQuestions().toPromise();

    expect(result).toEqual(questions);
    expect(questionRepoMock.findAll).toHaveBeenCalled();
  });

  // Tests that a question can be updated successfully.
  it('test_update_question', async () => {
    const question = new QuestionDomainModel();
    question._id = '123';
    question.topic = 'Math';
    question.level = 'Easy';
    question.type = 'Multiple Choice';
    question.sentence = 'What is 2+2?';
    question.options = ['3', '4', '5', '6'];
    question.answer = ['4'];

    const updatedQuestion = new QuestionDomainModel();
    updatedQuestion._id = '123';
    updatedQuestion.topic = 'Math';
    updatedQuestion.level = 'Easy';
    updatedQuestion.type = 'Multiple Choice';
    updatedQuestion.sentence = 'What is 2+2?';
    updatedQuestion.options = ['3', '4', '5', '6'];
    updatedQuestion.answer = ['5'];

    const questionRepoMock = {
      findOneById: jest.fn().mockReturnValue(of(question)),
      update: jest.fn().mockReturnValue(of(updatedQuestion)),
    };

    const questionService = new QuestionMongoService(questionRepoMock as any);

    const result = await questionService
      .updateQuestion('123', updatedQuestion)
      .toPromise();

    expect(result).toEqual(updatedQuestion);
    expect(questionRepoMock.update).toHaveBeenCalledWith(
      '123',
      updatedQuestion,
    );
  });

  // Tests that a question can be deleted successfully.
  it('test_delete_question', async () => {
    const question = new QuestionDomainModel();
    question._id = '123';
    question.topic = 'Math';
    question.level = 'Easy';
    question.type = 'Multiple Choice';
    question.sentence = 'What is 2+2?';
    question.options = ['3', '4', '5', '6'];
    question.answer = ['4'];

    const questionRepoMock = {
      delete: jest.fn().mockReturnValue(of(question)),
    };

    const questionService = new QuestionMongoService(questionRepoMock as any);

    const result = await questionService.deleteQuestion('123').toPromise();

    expect(result).toEqual(true);
    expect(questionRepoMock.delete).toHaveBeenCalledWith('123');
  });
});
