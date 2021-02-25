import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateUserService from '@modules/users/services/CreateUserService';

class SessionsController {
    public async create(request: Request, response: Response){
        const { name, email, password } = request.body;

        const userService = container.resolve(CreateUserService);

        const user = await userService.execute({
            name,
            email,
            password,
        });

        return response.json(user);
    };
};

export default SessionsController;