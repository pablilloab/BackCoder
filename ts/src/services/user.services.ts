import { UserEntity } from "../entities/user.entity";
import { ErrorHandle } from "../error/errorHandle";
import { userModel } from "../models/user.model";
import { UserRepository } from "../repositories/user.repository";

export class UserServices{
    private userRepository: UserRepository;

    constructor(){
        this.userRepository = new UserRepository();
    }

    async registerUser(userData: UserEntity){
        const user = await this.userRepository.getOne({email: userData.email});

        if(user){
            throw new Error("El usuario existe en la DB");
        }

        return await this.userRepository.create(userData);
    }

    async loginUser(email: string, password: string) {
        const user = await this.userRepository.getOne({email});

        if(!user || user.password !== password){
            throw ErrorHandle.unauthorized();
        }       
        
        return user;
    }
}