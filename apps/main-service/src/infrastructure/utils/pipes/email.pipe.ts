import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class EmailPipe implements PipeTransform<string> {
  transform(value: string) {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!emailRegex.test(value)) {
      throw new BadRequestException('Invalid email address');
    }
    console.log('value', value);
    return value;
  }
}
