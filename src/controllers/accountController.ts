import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { account } from "../models/account";
import log from "../utils/logger";
import { generateToken } from "../utils/token";

const JWT_SECRET = process.env.JWT_SECRET as string;

// signup
const signup = async (req: Request, res: Response) => {
  try {
    // if user already exists show error
    const { email, password, firstName, lastName, phone } = req.body;
    const user = await account.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).send({
        message: "User already exists",
        status: 400,
      });
    }
    // create new user
    const hashPassword = await bcrypt.hash(password, 10);
    console.log(hashPassword);

    const newUser = new account({
      email,
      password: hashPassword,
      firstName,
      lastName,
      phone,
    });
    await newUser.save();

    res.status(200).send({
      message: "User created successfully",
      status: 200,
      data: newUser,
    });
  } catch (err) {
    res.status(500).send({
      message: "Error in Saving",
      error: err,
    });
  }
};

// login
const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await account.findOne({
      email: email,
    });
    if (!user) {
      return res.status(400).send({
        message: "User not found",
        status: 400,
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    log.info(isMatch);
    if (!isMatch) {
      return res.status(400).send({
        message: "Incorrect password",
        status: 400,
      });
    }
    const token = generateToken(user);
    res.status(200).send({
      message: "User logged in successfully",
      status: 200,
      data: token,
    });
  } catch (err) {
    res.status(500).send({
      message: "Error in Login",
      error: err,
    });
  }
};

// get all users
const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await account.find({});
    res.status(200).send({
      message: "Users fetched successfully",
      status: 200,
      data: users,
    });
  } catch (err) {
    res.status(500).send({
      message: "Error in Fetching users",
      error: err,
    });
  }
};

export const accountRouter = {
  signup,
  login,
  getAllUsers,
};
