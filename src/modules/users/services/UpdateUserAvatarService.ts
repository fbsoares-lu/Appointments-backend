import User from '@modules/users/infra/typeorm/entities/User';
import path from 'path';
import fs from 'fs';

import uploadConfig from '@config/upload';

import AppError from '@shared/errors/AppError';
import IUserRepository from '../repositories/IUserRepository';
import { injectable, inject } from 'tsyringe';

interface IRequest {
    user_id: string;
    avatarFilename: string;
}

@injectable()
class UpdateUserAvatarService {
    constructor(
        @inject('UserRepository')
        private userRepository: IUserRepository
    ){};

    public async execute({user_id, avatarFilename}: IRequest): Promise<User>{

        const user = await this.userRepository.findById(user_id);

        if (!user) {
            throw new AppError('Only authenticated users can change avatar.', 401);
        }

        if (user.avatar) {
            const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
            const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

            if (userAvatarFileExists) {
                await fs.promises.unlink(userAvatarFilePath);
            }
        }

        user.avatar = avatarFilename;
        await this.userRepository.save(user);

        return user;
    }
}

export default UpdateUserAvatarService;