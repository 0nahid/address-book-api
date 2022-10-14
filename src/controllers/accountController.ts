import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { ObjectId } from "mongoose";
import { account } from "../models/account";
import log from "../utils/logger";
import { generateToken } from "../utils/token";

interface queries {
  sortBy?: string;
  limit?: number;
  page?: number;
  fields?: string;
  skip?: number;
  id?: ObjectId;
}
type ids = ObjectId | string;

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
  // Fetch the list of contacts with pagination.
  let filters = { ...req.query };
  console.log(filters);
  
  // exclude the page and limit from the query
  const excludedFields = ["page", "limit", "sort"];
  excludedFields.forEach((field) => delete filters[field]);
  // build the query
  let queries: queries = {};
  if (req.query.sort) {
    const sortBy = req.query.sort.toString().split(",").join(" ");
    queries.sortBy = sortBy;
  }
  // console.log(queries.sortBy);
  if (req.query.fields) {
    const fields = req.query.fields.toString().split(",").join(" ");
    queries.fields = fields;
  }
  // pagination logic
  const { page, limit } = req.query;
  const pageNumber = parseInt(page as string, 10) || 1;
  const limitNumber = parseInt(limit as string, 10) || 10;
  const skip = (pageNumber - 1) * limitNumber;
  queries.skip = skip;
  queries.limit = limitNumber;
  console.log(queries);
  try {
    const users = await account.find(filters).skip(queries.skip).limit(queries.limit);
    res.status(200).send({
      message: "Users fetched successfully",
      status: 200,
      data: users,
    });
  }
  catch (err) {
    res.status(500).send({
      message: "Error in Fetching users",
      error: err,
    });
  }
};

// add bulk users
const addBulkUsers = async (req: Request, res: Response) => {
  // log.info(req.body);
  try {
    let payload = req.body;
    payload.forEach(async (element: any) => {
      const { email, password, firstName, lastName, phone } = element;
      const user = await account.findOne({ email: element.email });
      if (user) {
        return res.status(400).send({
          message: "User already exists",
          status: 400,
        });
      }
      // create new user
      const hashPassword = await bcrypt.hash(password, 10);
      const newUser = new account({
        email,
        password: hashPassword,
        firstName,
        lastName,
        phone,
      });
      await newUser.save();
    });
    res.status(200).send({
      message: "Users created successfully",
      status: 200,
    });
  } catch (err) {
    res.status(500).send({
      message: "Error in Saving",
      error: err,
    });
  }
};

export const accountRouter = {
  signup,
  login,
  getAllUsers,
  addBulkUsers,
};
