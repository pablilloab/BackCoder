
import { CrudRepository } from "./crud.repository";
import { UserEntity } from "../entities/user.entity";
import { userModel } from "../models/user.model";

export class UserRepository extends CrudRepository<UserEntity> {

    constructor() {
        super(userModel);        
    }
}