import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { account } from "../models/account";

const JWT_SECRET = process.env.JWT_SECRET as string;

// signup
const signup = async (req: Request, res: Response) => {
  try {
    const user = await account.create(req.body);
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: "7d",
    });
    res.status(201).json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error signing up. Please try again later.");
  }
};

export const accountRouter = {
  signup,
};
