import jwt from "jsonwebtoken";



//creo tk
export const createToken = (user) => {
    const { _id, email  } = user;
    const token = jwt.sign({_id, email}, "codigoSecreto", {expiresIn: "1m"});
    return token;
}



//verifica tk
export const verifyToken = (token) => {
    const decode = jwt.verify(token, "codigoSecreto");
    return decode;

}