import bcrypt from "bcrypt";


//hash pass
export const createHash = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}

//validate pass
export const isValidPassword = (user, password) => {
    return bcrypt.compareSync(password, user.password);
}

