import { hash } from 'bcryptjs'

import User from '../infra/typeorm/entities/User';

import AppError from '@shared/errors/AppError';
import IUserRepository from '../repositories/IUserRepository';

interface IRequest {
    name: string,
    email: string,
    password: string,
}

class CreateUserService {
    constructor(private userRepository: IUserRepository){};

    public async execute({ name, email, password}: IRequest): Promise<User> {

        const findEmailExists = await this.userRepository.findByEmail(email);

        if(findEmailExists) {
            throw new AppError('Email andress is alredy exists');
        }

        const hashedPassword = await hash(password, 8);

        const createUser = this.userRepository.create({
            name,
            email,
            password: hashedPassword,
        });

        return createUser;
    }
}

export default CreateUserService;