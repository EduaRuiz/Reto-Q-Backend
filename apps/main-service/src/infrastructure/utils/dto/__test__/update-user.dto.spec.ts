import { UpdateUserDto } from '../update-user.dto';
import { validate } from 'class-validator';

describe('UpdateUserDto', () => {
    let dto: UpdateUserDto;

    beforeEach(() => {
        dto = new UpdateUserDto();
    });

    it('should pass validation when all properties are valid', async () => {
        dto.level = '2';
        dto.available = false;
        const errors = await validate(dto);
        expect(errors.length).toBe(0);
    });

    it('should fail validation when level is not one of the valid values', async () => {
        dto.level = '4';
        dto.available = true;
        const errors = await validate(dto);
        expect(errors.length).toBeGreaterThan(0);
    });
});