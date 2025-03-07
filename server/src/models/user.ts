import mongoose from "mongoose";

interface IUser extends mongoose.Document {
  name: string;
  pronouns: string;
  role: string;
  location: string;
  year: string;
  major: string;
  bio: string;
  imgURL: string;
  email: string;
  linkedin: string;
  slack: string;
}

const userSchema = new mongoose.Schema<IUser>(
  {
    name: String,
    pronouns: String,
    role: String,
    location: String,
    year: String,
    major: String,
    bio: String,
    imgURL: String,
    email: String,
    linkedin: String,
    slack: String,
  },
  { collection: "Users" }
);

export const UserModel = mongoose.model<IUser>("Users", userSchema);
