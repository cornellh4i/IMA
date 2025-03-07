import express, { Request, Response } from "express";
import { UserModel } from "../models/user";

// Add User
export const addUser = async (req: Request, res: Response): Promise<any> => {
  const data = new UserModel({
    name: req.body.name,
    pronouns: req.body.pronouns,
    role: req.body.role,
    location: req.body.location,
    year: req.body.year,
    major: req.body.major,
    bio: req.body.bio,
    imgURL: req.body.imgURL,
    email: req.body.email,
    linkedin: req.body.linkedin,
    slack: req.body.slack,
  });
  try {
    const savedData = await data.save();
    res.status(200).json(savedData);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// Delete All Users
export const deleteAllUsers = async (
  req: Request,
  res: Response
): Promise<any> => {
  UserModel.deleteMany({})
    .then((result) => {
      console.log(`${result.deletedCount} documents were deleted.`);
      res
        .status(200)
        .json({ message: `${result.deletedCount} documents were deleted.` });
    })
    .catch((error) => {
      console.error(`An error occurred: ${error.message}`);
      res.status(500).json({ message: `An error occurred: ${error.message}` });
    });
  console.log("skip");
};

//  Get All Users
export const getAllUsers = async (
  req: Request,
  res: Response
): Promise<any> => {
  UserModel.find(function (err, docs) {
    if (err) {
      console.log(err);
    } else {
      console.log(docs);
      res.send(docs);
    }
  });
};

// Get member by name
export const getUserByName = async (
  req: Request,
  res: Response
): Promise<any> => {
  UserModel.find({ name: req.params.name }, function (err: any, docs: any) {
    if (err) {
      console.log(err);
      res.status(500).send("Error retrieving members");
    } else {
      console.log(req.params.name);
      console.log(docs);
      res.send(docs);
    }
  });
};

// TODO Pair 1: (DELETE) Write and implement the Delete memember by name route

// TODO Pair 2: (PUT) Write and implement the Update member route
