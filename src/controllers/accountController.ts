import { Request, Response } from "express";
import { account } from "../models/account";

const JWT_SECRET = process.env.JWT_SECRET as string;

// signup
const signup = async (req: Request, res: Response) => {
  try {
    // if user already exists show error
    const user = await account.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).send({
        message: "User already exists",
        status: 400,
      });
    }
    // create new user
    const newUser = await account.create(req.body);
  } catch (err) {
    res.status(500).send({
      message: "Error in Saving",
      error: err,
    });
  }
};

export const accountRouter = {
  signup,
};
