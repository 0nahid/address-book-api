import mongoose, { Schema } from "mongoose";
import PasswordValidator from "password-validator";
import validator from "validator";

const passwordSchema = new PasswordValidator()
  .min(8)
  .has()
  .uppercase()
  .has()
  .lowercase()
  .has()
  .digits()
  .has()
  .not()
  .spaces();

export interface IUser extends Document {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
  _doc: any;
}
const accountSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: (email: string) => validator.isEmail(email),
        message: "Invalid email",
      },
    },
    password: {
      type: String,
      required: true,
      validate: {
        validator: (password: string) => passwordSchema.validate(password),
        message: "Invalid password",
      },
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
      validate: {
        validator: (phone: string) => validator.isMobilePhone(phone),
        message: "Invalid phone number",
      },
    },
  },
  {
    timestamps: true,
  }
);

export const account = mongoose.model("Account", accountSchema);
