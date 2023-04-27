
import { validate } from 'class-validator';
import { RegisterUserDto } from '../register-user.dto';

describe('RegisterUserDto', () => {
    let dto: RegisterUserDto;

    beforeEach(() => {
        dto = new RegisterUserDto();
        dto.fullName = 'John Doe';
        dto.email = 'john.doe@example.com';
        dto.level = '1';
        dto.available = true;
        dto.role = 'User';
    });

    it('should be valid', async () => {
        const errors = await validate(dto);
        expect(errors.length).toBe(0);
    });

    it('should fail if fullName is empty', async () => {
        dto.fullName = '';

        const errors = await validate(dto);
        expect(errors.length).toBeGreaterThan(0);
        expect(errors[0].property).toBe('fullName');
    });

    it('should fail if email is invalid', async () => {
        dto.email = 'invalid.email.com';

        const errors = await validate(dto);
        expect(errors.length).toBeGreaterThan(0);
        expect(errors[0].property).toBe('email');
    });

    it('should fail if level is not "1", "2", or "3"', async () => {
        dto.level = '4';

        const errors = await validate(dto);
        expect(errors.length).toBeGreaterThan(0);
        expect(errors[0].property).toBe('level');
    });

    it('should fail if available is not a boolean', async () => {
        dto.available = null;

        const errors = await validate(dto);
        expect(errors.length).toBeGreaterThan(0);
        expect(errors[0].property).toBe('available');
    });

    it('should fail if role is not "User" or "Admin"', async () => {
        dto.role = 'InvalidRole';

        const errors = await validate(dto);
        expect(errors.length).toBeGreaterThan(0);
        expect(errors[0].property).toBe('role');
    });
});