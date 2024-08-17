import { Handler } from "express";
import { UserServices } from "../services/user.services";
import { createToken } from "../utils/jwt";

export class UserController{
    private UserSevice : UserServices

    constructor(){
        this.UserSevice = new UserServices();
    }

    registerUser:Handler = async (req, res, next) => {
        try {
            const user = await this.UserSevice.registerUser(req.body);
            res.status(201).json({status: "Ok", user});

        } catch (error) {
            next(error);
        }
    }

    loginUser: Handler = async (req, res, next) => {
        try {
            const { email, password} = req.body;
            const user = await this.UserSevice.loginUser(email, password);
            
            const token = createToken({email:  user.email, _id: user._id as string});

            res.cookie("token", token, {httpOnly: true});
            res.status(202).json({status: "Ok", user});

        } catch (error) {
            next(error);
        }
    }
}