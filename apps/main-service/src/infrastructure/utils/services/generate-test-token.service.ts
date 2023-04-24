import { Injectable } from '@nestjs/common';

@Injectable()
export class GenerateTestTokenService {
  generateToken(): string {
    const letters: string[] = [];
    while (letters.length < 4) {
      const letter = String.fromCharCode(Math.floor(Math.random() * 26) + 65);
      (letters.indexOf(letter) === -1 ||
        letters.filter((l) => l === letter).length <= 2) &&
        letters.push(letter);
    }
    const numbers: number[] = [];
    while (numbers.length < 4) {
      const num = Math.floor(Math.random() * 10);
      !numbers.includes(num) &&
        numbers.filter((n) => n === num).length <= 2 &&
        numbers.push(num);
    }
    return [...letters, , '-', ...numbers].join('');
  }
}
