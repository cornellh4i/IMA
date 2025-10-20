import { Request, Response } from "express";
import { getSessionService } from "../services/sessionService";


/**
 * Get the current session
 * @param req - The request object
 * @param res - The response object
 * @returns The session object
 */
export const getSession = async (req: Request, res: Response): Promise<void> => {
    try {
        const session = await getSessionService();
        res.status(200).json(session);
    } catch (error) {
        console.error("Error fetching session:", error);
        res.status(500).json({ error: "Failed to fetch session" });
    }
};
