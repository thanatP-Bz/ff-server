import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, "please provide a name"],
  },
  email: {
    type: String,
    unique: true,
    required: true,
    validate: {
      validator: validator.isEmail,
      message: "please provide email",
    },
  },
  password: {
    type: String,
    required: [true, "please provide a password"],
    select: true,
  },
});

//hash password
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

//jsonwebtoken
UserSchema.methods.createJWT = function (_id) {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "30d" });
};

//compare password
UserSchema.methods.comparePassword = async function (cadidatePassword) {
  const isMatch = await bcrypt.compare(cadidatePassword, this.password);
  return isMatch;
};

export default mongoose.model("User", UserSchema);
