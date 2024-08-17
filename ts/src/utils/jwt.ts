import jwt from "jsonwebtoken";
import envsConfig from "../config/envs.config";

interface JwtPayload{
    email: string;
    _id: string;
}

// Crear el token
export const createToken = (user: JwtPayload) => {
  const { email, _id } = user;
  const token = jwt.sign({ _id, email }, envsConfig.JWT_SECRET!, { expiresIn: "10m" });
  return token;
};

// Verificar el token
export const verifyToken = (token: string) => {
  try {
    const decode = jwt.verify(token, envsConfig.JWT_SECRET!);
    return decode;
  } catch (error) {
    return null;
  }
};