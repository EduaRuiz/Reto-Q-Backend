import { Test, TestingModule } from '@nestjs/testing';
import { of, throwError } from 'rxjs';
import { UserDomainModel } from '@main-service/domain/models';
import { UserMongoRepository } from '../../repositories/user.mongo-repository';
import { UserMongoModel } from '../../models/user.mongo-model';
import { UserMongoService } from '../user.mongo-service';


describe('UserMongoService', () => {
    let service: UserMongoService;
    let repository: UserMongoRepository;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UserMongoService,
                {
                    provide: UserMongoRepository,
                    useValue: {
                        create: jest.fn(),
                        findOneById: jest.fn(),
                        findOneByEmail: jest.fn(),
                        update: jest.fn(),
                    },
                },
            ],
        }).compile();

        service = module.get<UserMongoService>(UserMongoService);
        repository = module.get<UserMongoRepository>(UserMongoRepository);
    });

    describe('getUserByEmail', () => {
        it('should return a user by email', (done) => {
            const user = new UserMongoModel();
            jest.spyOn(repository, 'findOneByEmail').mockReturnValueOnce(of(user));
            service.getUserByEmail('test@example.com').subscribe((result) => {
                expect(repository.findOneByEmail).toHaveBeenCalledWith('test@example.com');
                expect(result).toBe(user);
                done();
            });
        });

        it('should throw an error if an unexpected error occurs', (done) => {
            jest.spyOn(repository, 'findOneByEmail').mockReturnValueOnce(throwError(new Error()));
            service.getUserByEmail('test@example.com').subscribe(
                () => { },
                (error) => {
                    expect(repository.findOneByEmail).toHaveBeenCalledWith('test@example.com');
                    expect(error.status).toBe(undefined);
                    expect(error.message).toBe('');
                    done();
                },
            );
        });
    });

    describe('registerUser', () => {
        it('should create a new user', (done) => {
            const user = new UserDomainModel();
            jest.spyOn(repository, 'create').mockReturnValueOnce(of(user));
            service.registerUser(user).subscribe((result) => {
                expect(repository.create).toHaveBeenCalledWith(user);
                expect(result).toBe(user);
                done();
            });
        });

        it('should throw an error if an unexpected error occurs', (done) => {
            const user = new UserDomainModel();
            jest.spyOn(repository, 'create').mockReturnValueOnce(throwError(new Error()));
            service.registerUser(user).subscribe(
                () => { },
                (error) => {
                    expect(repository.create).toHaveBeenCalledWith(user);
                    expect(error.status).toBe(undefined);
                    expect(error.message).toBe('');
                    done();
                },
            );
        });
    });

    describe('getUserById', () => {
        it('should call userRepository.findOneById with the given id', () => {
            const id = 'user-id';
            const findOneByIdSpy = jest.spyOn(repository, 'findOneById').mockImplementation(() => of());

            service.getUserById(id);

            expect(findOneByIdSpy).toHaveBeenCalledWith(id);
        });

        it('should return the result of userRepository.findOneById', () => {
            const id = 'user-id';
            const user = {
                id,
                fullName: "Cristian Tironi",
                email: "correo@correo.com",
                level: "2",
                available: true,
                role: "admin"
            };
            jest.spyOn(repository, 'findOneById').mockImplementation(() => of(user));

            service.getUserById(id).subscribe(result => {
                expect(result).toEqual(user);
            });
        });
    });

    describe('updateUser', () => {
        it('should call getUserById with the given id', () => {
            const id = 'user-id';
            const entity = {
                id,
                fullName: "Cristian Tironi",
                email: "correo@correo.com",
                level: "2",
                available: true,
                role: "admin"
            };
            const getUserByIdSpy = jest.spyOn(service, 'getUserById').mockImplementation(() => of());

            service.updateUser(id, entity);

            expect(getUserByIdSpy).toHaveBeenCalledWith(id);
        });

        it('should call userReposiroty.update with the given id and updated data', () => {
            const id = 'user-id';
            const entity = {
                id,
                fullName: "Cristian Tironi",
                email: "correo@correo.com",
                level: "2",
                available: true,
                role: "admin"
            };
            const user = {
                id,
                fullName: "Cristian Tironi",
                email: "correo@correo.com",
                level: "2",
                available: true,
                role: "admin"
            };
            jest.spyOn(service, 'getUserById').mockImplementation(() => of(user));
            const updateSpy = jest.spyOn(repository, 'update').mockImplementation(() => of());

            service.updateUser(id, entity).subscribe(() => {
                expect(updateSpy).toHaveBeenCalledWith(id, { ...user, level: 2 });
            });
        });
    });
});