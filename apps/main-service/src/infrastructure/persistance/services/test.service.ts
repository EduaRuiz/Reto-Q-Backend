import { Injectable } from '@nestjs/common';
import { TestMongoService } from '../databases/mongo/services';

@Injectable()
export class TestService extends TestMongoService {}
