import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import User from '../infra/typeorm/entities/User';

import AppError from '@shared/errors/AppError';

interface Request {
    name: string,
    email: string,
    password: string,
}

class CreateUserService {
    public async execute({ name, email, password}: Request): Promise<User> {
        const userRepository = getRepository(User);

        const findEmailExists = await userRepository.findOne({
            where: {email},
        });

        if(findEmailExists) {
            throw new AppError('Email andress is alredy exists');
        }

        const hashedPassword = await hash(password, 8);

        const createUser = userRepository.create({
            name,
            email,
            password: hashedPassword,
        });

        await userRepository.save(createUser);

        return createUser;
    }
}

export default CreateUserService;