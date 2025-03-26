import express, { Request, Response } from "express";
import { UserModel } from "../models/user"; 

// Add User
export const addUser = async (req: Request, res: Response): Promise<any> => {
  console.log("Received request:", req.body);
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

//  Get All Users (maybe change to getFilteredUsers?)
export const getAllUsers = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    type CategoryKeys = "role" | "major" | "year" | "location";

    const categories: Record<CategoryKeys, string[]> = {
      role: ["Developer", "Project Manager", "Designer", "External", "Other"],
      major: [
        "Computer Science",
        "Information Science",
        "Economics",
        "Electrical and Computer Engineering",
        "Other",
      ],
      year: ["2028", "2027", "2026", "2025", "2024", "Other"],
      location: ["San Fransisco", "New York City", "Chicago", "Austin", "Other"],
    };

    const filter: Record<string,any> = { $or : []};

    for (const [key,value] of Object.entries(req.query)) {
        if (typeof value === "string") {
          if (value.includes("Other")) {
            filter.$or.push(
              { [key]: { $nin: categories[key as CategoryKeys] } },
              { [key]: { $in: value.split(",") } }
            )
          } else {
            filter[key] = { $in: value.split(",")};
          }
        }
      console.log(JSON.stringify(filter, null, 2));
    }

    const users = await UserModel.find(filter);
    res.send(users);
    
  } catch (err) {
      console.log(err);
    }
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

export const deleteUserById = async (
  req: Request,
  res: Response
): Promise<any> => {
  UserModel.findByIdAndDelete(req.params.id, function (err: any, docs: any) {
    if (err) {
      console.log(err);
      res.status(500).send("Error retrieving members");
    } else {
      console.log(docs);
      res.send(docs);
    }
  });
};

export const updateUserById = async (
  req: Request,
  res: Response
): Promise<any> => {
  const userId = req.params.id;
  const updateData = req.body;

  try {
    const updatedMember = await UserModel.findByIdAndUpdate(
      userId,
      updateData
    ).exec();
    res.status(200).json(updatedMember);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};
