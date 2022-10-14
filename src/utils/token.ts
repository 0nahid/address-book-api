import jwt from "jsonwebtoken";
import { IUser } from "../models/account";

const JWT_SECRET = process.env.JWT_SECRET as string;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN as string;
export const generateToken = (user: IUser) => {
  const { email } = user;
  const token = jwt.sign({ email }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });
  return token;
};
