import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import authConfig from '@config/auth';
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import User from '@modules/users/infra/typeorm/entities/User';
import IUserRepository from '../repositories/IUserRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

interface IRequest {
    email: string,
    password: string,
}

interface IResponse {
    user: User;
    token: string,
}

@injectable()
class AuthenticateUserService {
    constructor(
        @inject('UserRepository')
        private userRepository: IUserRepository,

        @inject('HashProvider')
        private hashProvider: IHashProvider,
    ){};

    public async execute({email, password}: IRequest): Promise<IResponse> {

        const user = await this.userRepository.findByEmail(email);

        if(!user) {
            throw new AppError('Invalid Email/Password!', 401);
        }

        const passwordMatched = await this.hashProvider.compareHash(password, user.password);

        if(!passwordMatched) {
            throw new AppError('Invalid Email/Password!', 401);
        }

        const {secret, expiresIn} = authConfig.jwt;

        const token = sign({}, secret, {
            subject: user.id,
            expiresIn: expiresIn,
        });

        return {user, token};
    }
}

export default AuthenticateUserService;