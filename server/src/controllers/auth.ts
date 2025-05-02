import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { UserModel } from "../models/user";

const createToken = (id: string) => {
    return jwt.sign({ id }, process.env.JWT_SECRET as string, { expiresIn: "7d" });
};


export const signupUser = async (
  req: Request,
  res: Response
): Promise<any> => {
    if (!req.body.name || !req.body.email || !req.body.password) { 
        return res.status(400).json("Name, email, or password is not provided.")
    };
    const userName = req.body.name;
    const userEmail = req.body.email;
    const userPassword = req.body.password;
    const user = await UserModel.findOne({email: userEmail})

    if (user) { 
        return res.status(400).json("User with this email already exists.")
    }
    
    const hashedPassword = await bcrypt.hash(userPassword, 10);
    //const token = createToken(hashedPassword); 

    const data = new UserModel({
        name: userName,
        password: hashedPassword, 
        email: userEmail,
    });
    try {
        const user = await data.save();
        const token = createToken(data._id.toString());

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });

        res.status(201).json(user);
    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }   
}

export const loginUser = async (
    req: Request,
    res: Response
  ): Promise<any> => {
    if (!req.body.email || !req.body.password){
        return res.status(400).json("Email or password is not provided.")
    };

    const userEmail = req.body.email;
    const userPassword = req.body.password;
    const user = await UserModel.findOne({email: userEmail});

    if (!user) {
        return res.status(400).json("No user registered with the given email.")
    } 

    const isMatch = await bcrypt.compare(userPassword, user.password)
    
    const hashedPassword = await bcrypt.hash(userPassword, 10);
    const token = createToken(hashedPassword);

    if (isMatch) {
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });
        res.status(200).json(user)
    } else {
        res.status(400).json("Incorrect Password");
    }

  }

  export const logoutUser = async (
    req: Request,
    res: Response
  ): Promise<any> => {
    res.clearCookie('token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
    }); 
    res.status(200).json("Logged out successfully")
  }