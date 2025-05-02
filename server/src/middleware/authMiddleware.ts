import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
import { UserModel } from '../models/user'
import dotenv from "dotenv";

export const requireAuth = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<any> => {
    const token = req.cookies.token;

    if (!token) { 
        return res.status(401).json({ message: "token missing or invalid"});
    }

    if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET is not defined");
    }

    try {
        console.log("token");
        console.log("JWT_SECRET:", process.env.JWT_SECRET);
        const decoded = jwt.verify(token, process.env.JWT_SECRET) as { id: string};
        console.log("decoded token", decoded);
        const user = await UserModel.findById(decoded.id).select('-password');
    
        if (!user) {
            return res.status(401).json({ message: "user not found"});
        }

        (req as any).user = user;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized"});
    }
    
};
    