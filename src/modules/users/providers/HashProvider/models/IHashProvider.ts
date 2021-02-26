export default interface IHashProvider {
    genereateHash(payload: string): Promise<string>;
    compareHash(payload: string, hashed: string): Promise<boolean>; 
}