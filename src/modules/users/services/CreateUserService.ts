import { injectable, inject } from 'tsyringe';

import User from '../infra/typeorm/entities/User';

import AppError from '@shared/errors/AppError';
import IUserRepository from '../repositories/IUserRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

interface IRequest {
    name: string,
    email: string,
    password: string,
}

@injectable()
class CreateUserService {
    constructor(
        @inject('UserRepository')
        private userRepository: IUserRepository,

        @inject('HashProvider')
        private hashProvider: IHashProvider,
    ){};

    public async execute({ name, email, password}: IRequest): Promise<User> {

        const findEmailExists = await this.userRepository.findByEmail(email);

        if(findEmailExists) {
            throw new AppError('Email andress is alredy exists');
        }

        const hashedPassword = await this.hashProvider.genereateHash(password);

        const createUser = this.userRepository.create({
            name,
            email,
            password: hashedPassword,
        });

        return createUser;
    }
}

export default CreateUserService;