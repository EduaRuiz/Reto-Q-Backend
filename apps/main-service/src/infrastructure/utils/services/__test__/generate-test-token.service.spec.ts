import { GenerateTestTokenService } from '..';

describe('GenerateTestTokenService', () => {
  // Tests that generateToken method returns a string of length 9.
  it('test_generate_token_returns_string_of_length_9', () => {
    const tokenService = new GenerateTestTokenService();
    const token = tokenService.generateToken();
    expect(token.length).toBe(9);
  });

  // Tests that generateToken method returns a string with 4 letters and 4 numbers separated by a hyphen.
  it('test_generate_token_returns_string_with_4_letters_and_4_numbers_separated_by_hyphen', () => {
    const tokenService = new GenerateTestTokenService();
    const token = tokenService.generateToken();
    const letters = token.slice(0, 4);
    const numbers = token.slice(5);
    expect(letters).toMatch(/[A-Z]{4}/);
    expect(numbers).toMatch(/[0-9]{4}/);
    expect(token.charAt(4)).toBe('-');
  });

  // Tests that generateToken method returns a string with at least one letter and one number.
  it('test_generate_token_returns_string_with_at_least_one_letter_and_one_number', () => {
    const tokenService = new GenerateTestTokenService();
    const token = tokenService.generateToken();
    const letters = token.match(/[A-Z]/g);
    const numbers = token.match(/[0-9]/g);
    expect(letters.length).toBeGreaterThan(0);
    expect(numbers.length).toBeGreaterThan(0);
  });

  // Tests that generateToken method returns a string with letters and numbers in random order.
  it('test_generate_token_returns_string_with_letters_and_numbers_in_random_order', () => {
    const tokenService = new GenerateTestTokenService();
    const token = tokenService.generateToken();
    const letters = token.slice(0, 4);
    const numbers = token.slice(5);
    const sortedLetters = letters.split('').sort().join('');
    const sortedNumbers = numbers.split('').sort().join('');
    expect(token).not.toBe(`${sortedLetters}-${sortedNumbers}`);
  });
});
