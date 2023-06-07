import exp from 'constants';
import { RandomQuestionService } from '..';

describe('RandomQuestionService_class', () => {
  // Tests that the generate method returns the expected number of questions.
  it('test_generate_returns_expected_number_of_questions', () => {
    const service = new RandomQuestionService();
    const questions = [
      {
        topic: 'math',
        type: 'algebra',
        sentence: 'What is 2+2?',
        options: ['3', '4', '5'],
        answer: ['4'],
      },
      {
        topic: 'math',
        type: 'geometry',
        sentence: 'What is the area of a square with side length 5?',
        options: ['20', '25', '30'],
        answer: ['25'],
      },
      {
        topic: 'science',
        type: 'biology',
        sentence: 'What is the powerhouse of the cell?',
        options: ['mitochondria', 'nucleus', 'ribosome'],
        answer: ['mitochondria'],
      },
      {
        topic: 'science',
        type: 'chemistry',
        sentence: 'What is the chemical symbol for gold?',
        options: ['Au', 'Ag', 'Cu'],
        answer: ['Au'],
      },
      {
        topic: 'history',
        type: 'world',
        sentence: 'In what year did World War II end?',
        options: ['1943', '1945', '1947'],
        answer: ['1945'],
      },
      {
        topic: 'history',
        type: 'us',
        sentence: 'Who was the first president of the United States?',
        options: ['George Washington', 'Thomas Jefferson', 'John Adams'],
        answer: ['George Washington'],
      },
    ];
    const generatedQuestions = service.generate(questions as any);
    expect(generatedQuestions.length).toBe(15);
  });

  // Tests that the selectRandom method selects the correct number of questions.
  // it('test_select_random_selects_correct_number_of_questions', () => {
  //   const service = new RandomQuestionService();
  //   const questions = [
  //     {
  //       topic: 'math',
  //       type: 'algebra',
  //       sentence: 'What is 2+2?',
  //       options: ['3', '4', '5'],
  //       answer: ['4'],
  //     },
  //     {
  //       topic: 'math',
  //       type: 'geometry',
  //       sentence: 'What is the area of a square with side length 5?',
  //       options: ['20', '25', '30'],
  //       answer: ['25'],
  //     },
  //     {
  //       topic: 'science',
  //       type: 'biology',
  //       sentence: 'What is the powerhouse of the cell?',
  //       options: ['mitochondria', 'nucleus', 'ribosome'],
  //       answer: ['mitochondria'],
  //     },
  //     {
  //       topic: 'science',
  //       type: 'chemistry',
  //       sentence: 'What is the chemical symbol for gold?',
  //       options: ['Au', 'Ag', 'Cu'],
  //       answer: ['Au'],
  //     },
  //     {
  //       topic: 'history',
  //       type: 'world',
  //       sentence: 'In what year did World War II end?',
  //       options: ['1943', '1945', '1947'],
  //       answer: ['1945'],
  //     },
  //     {
  //       topic: 'history',
  //       type: 'us',
  //       sentence: 'Who was the first president of the United States?',
  //       options: ['George Washington', 'Thomas Jefferson', 'John Adams'],
  //       answer: ['George Washington'],
  //     },
  //   ];

  //   expect((service as any).selectRandom(questions as any, 1).length).toBe(1);
  // });

  // Tests the behavior of the generate method when given an empty input array.
  it('test_empty_input_array', () => {
    const service = new RandomQuestionService();
    const questions = [];
    const generatedQuestions = service.generate(questions);
    expect(generatedQuestions.length).toBe(15);
  });
});
