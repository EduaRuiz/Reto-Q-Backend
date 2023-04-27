
import { validateSync } from 'class-validator';
import { NewQuestionDto } from '../new-question.dto';

describe('NewQuestionDto', () => {
    it('should validate correctly', () => {
        const dto = new NewQuestionDto();
        dto.topic = 'Topic';
        dto.level = '1';
        dto.type = 'multiple';
        dto.sentence = 'Sentence';
        dto.options = ['Option 1', 'Option 2'];
        dto.answer = ['Option 1'];

        const errors = validateSync(dto);
        expect(errors.length).toBe(0);
    });

    it('should throw an error if topic is not provided', () => {
        const dto = new NewQuestionDto();
        dto.level = '1';
        dto.type = 'multiple';
        dto.sentence = 'Sentence';
        dto.options = ['Option 1', 'Option 2'];
        dto.answer = ['Option 1'];

        const errors = validateSync(dto);
        expect(errors.length).toBeGreaterThan(0);
        expect(errors[0].constraints).toHaveProperty('isNotEmpty');
        expect(errors[0].constraints.isNotEmpty).toBeDefined();
    });
});


