import IHashProvider from '../models/IHashProvider';

class BCryptHashProvider implements IHashProvider {
    public async genereateHash(payload: string): Promise<string>{
        return payload;
    };

    public async compareHash(payload: string, hashed: string): Promise<boolean>{
        return payload === hashed;
    };    
};

export default BCryptHashProvider;