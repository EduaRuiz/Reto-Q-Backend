import { EmailPipe } from '.';

// Tests that a valid email address is returned without errors.
it('test_valid_email', () => {
  const emailPipe = new EmailPipe();
  const validEmail = 'test@example.com';
  expect(emailPipe.transform(validEmail)).toEqual(validEmail);
});

// Tests that different combinations of characters in an email address are returned without errors.
it('test_email_combinations', () => {
  const emailPipe = new EmailPipe();
  const emailCombinations = [
    'test@example.com',
    'test.email@example.com',
    'test+email@example.com',
    'test.email+123@example.com',
  ];
  emailCombinations.forEach((email) => {
    expect(emailPipe.transform(email)).toEqual(email);
  });
});
