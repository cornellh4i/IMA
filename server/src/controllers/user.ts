import express, { Request, Response } from "express";
import { UserModel } from "../models/user"; 

/**
 * Adds a new user
 * Parameter:
 * @param req: user information with at least a name or email
 * @param res: response object used to return the new user data or an error message
 * @returns promise with the new user object or an error
 */
export const addUser = async (
  req: Request,
  res: Response
): Promise<any> => {
  if (!req.body.name || !req.body.email) { 
    res.status(400).json("name or email is undefined")
  };
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
    res.status(201).json(savedData);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
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
            filter.$or.push(
              { [key] : {$in: value.split(",")}}
            )
          }
        }
    }

    const users = await UserModel.find(filter);
    res.send(users);
    
  } catch (err) {
      console.log(err);
    }
  };

/**
 * Retrieves a user by name
 * Parameter:
 * @param req: name of the user
 * @param res: response object used to return the found user data or an error message
 * @returns promise with the retrieved user information or an error 
 */
export const getUserByName = async (
  req: Request,
  res: Response
): Promise<any> => {
  const userName = req.params.name;
  
  if (!userName) { 
    res.status(400).json({ message: "name is undefined"});
  }

  try {
    const user = await UserModel.find({name: userName});

    if (user.length === 0 || !user) {
      res.status(404).json({ message: "no user with provided name"}); 
    }
    res.status(200).json(user)
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }

};

/**
 * Deletes a user by ID
 * Parameter:
 * @param req: ID of user to be deleted
 * @param res: response object used to send back the deleted user data or an error
 * @returns promise with deleted user information or an error
 */
export const deleteUserById = async (
  req: Request,
  res: Response
): Promise<any> => {
  const userId = req.params.id;
  if(!userId) {
    res.status(400).json({ message: "userId is undefined"});
  }

  try {
    const deletedMember = await UserModel.findByIdAndDelete(userId).exec;
    if (!deletedMember) {res.status(404).json({ message: "no user with provided userId"})}
    res.status(200).json(deletedMember)
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }

};

/**
 * Updates the user information by ID
 * Parameter:
 * @param req: ID of the user to be updated and updated user information
 * @param Res: response object used to send back the updated user data or an error message
 * @returns promise with the updated user information or an error
 */
export const updateUserById = async (
  req: Request,
  res: Response
): Promise<any> => {
  const userId = req.params.id;
  if (!userId) {
    res.status(400).json({ message: "userId is undefined"});
  }
  const updateData = req.body;

  try {
    const updatedMember = await UserModel.findByIdAndUpdate(
      userId,
      updateData
    ).exec();
    if (!updatedMember) {
      res.status(404).json({ message: "no user with provided userID"})
    }
    res.status(200).json(updatedMember);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Search user by name, location, or email 
export const searchUsers = async (
  req: Request, 
  res: Response
): Promise<any> => {
  try {

    const { query } = req;
    const searchStr = query.q
    if (!searchStr) {
       res.status(200).json([])
    }


    const filter =  
    { 
      $or: [ 
        { name: { $regex: searchStr, $options: 'i'} }, 
        { location: { $regex: searchStr, $options: 'i'} }, 
        { email: { $regex: searchStr, $options: 'i'} } 
      ]
    };

    const matchedUsers = await UserModel.find(filter).exec();
    res.status(200).json(matchedUsers);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }

};
