import 'reflect-metadata';
import AppError from '@shared/errors/AppError';

import CreateUserService from './CreateUserService';
import FakeUserRepository from '../repositories/fakes/FakeUserRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

describe('CreateUser', () => {
    it('should be to create a new user', async () => {
        const userRepository = new FakeUserRepository();
        const fakeHashProvider = new FakeHashProvider();
        const createUserService = new CreateUserService(userRepository, fakeHashProvider);

        const user = await createUserService.execute({
            name: 'John Doe',
            email: 'johndoe@email.com',
            password: '123123'
        });

        expect(user).toHaveProperty('id');
    });

    it('should not be able to create two user with the same email', async () => {
        const userRepository = new FakeUserRepository();
        const fakeHashProvider = new FakeHashProvider();
        const createUserService = new CreateUserService(userRepository, fakeHashProvider);

        await createUserService.execute({
            name: 'John Doe',
            email: 'johndoe@email.com',
            password: '123123'
        });

        expect(
            createUserService.execute({
                name: 'John Doe',
                email: 'johndoe@email.com',
                password: '123123'
            }),
        ).rejects.toBeInstanceOf(AppError);
    })
});