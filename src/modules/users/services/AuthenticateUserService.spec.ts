import 'reflect-metadata';
import AppError from '@shared/errors/AppError';

import CreateUserService from './CreateUserService';
import FakeUserRepository from '../repositories/fakes/FakeUserRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import AuthenticateUserService from './AuthenticateUserService';

describe('AuthenticateUser', () => {
    it('should be to create a new user', async () => {
        const fakeUserRepository = new FakeUserRepository();
        const fakeHashProvider = new FakeHashProvider();

        const authenticateUser = new AuthenticateUserService(
            fakeUserRepository,
            fakeHashProvider
        );

        const createUserService = new CreateUserService(
            fakeUserRepository,
            fakeHashProvider
        );

        await createUserService.execute({
            name: 'John Doe',
            email: 'johndoe@email.com',
            password: '123123'
        });

        const authenticate = await authenticateUser.execute({
            email: 'johndoe@email.com',
            password: '123123'
        });

        expect(authenticate).toHaveProperty('token');
    });

    it('should not be able to authenticate with non existing user', async () => {
        const fakeUserRepository = new FakeUserRepository();
        const fakeHashProvider = new FakeHashProvider();

        const authenticateUser = new AuthenticateUserService(
            fakeUserRepository,
            fakeHashProvider
        );

        expect(
            authenticateUser.execute({
                email: 'johndoe@email.com',
                password: '123123'
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to authenticate with wrong password', async () => {
        const fakeUserRepository = new FakeUserRepository();
        const fakeHashProvider = new FakeHashProvider();

        const authenticateUser = new AuthenticateUserService(
            fakeUserRepository,
            fakeHashProvider
        );

        const createUserService = new CreateUserService(
            fakeUserRepository,
            fakeHashProvider
        );

        await createUserService.execute({
            name: 'John Doe',
            email: 'johndoe@email.com',
            password: '123123'
        });

        expect(
            authenticateUser.execute({
                email: 'johndoe@email.com',
                password: 'wrong-password'
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});