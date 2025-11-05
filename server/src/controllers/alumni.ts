import { Request, Response } from "express";
// Services will be implemented in server/src/services/alumniServices.ts
// Import types/services as you implement them:
// import { getAllAlumniService, getAlumniByIdService, queryAlumniService } from "../services/alumniServices";

/**
 * GET /api/alumni
 * Return all alumni.
 *
 * TODO: Implement by calling getAllAlumniService() and returning 200 with the list.
 * On errors, return 500 with a safe message.
 */
export const getAllAlumni = async (req: Request, res: Response): Promise<void> => {
  res.status(501).json({ error: "Not implemented: GET /api/alumni" });
};

/**
 * GET /api/alumni/:id
 * Return a single alumni by id.
 *
 * TODO: Validate id, call getAlumniByIdService(id), return 200 with record.
 * If missing id → 400; if not found → 404; other errors → 500.
 */
export const getAlumniById = async (req: Request, res: Response): Promise<void> => {
  res.status(501).json({ error: "Not implemented: GET /api/alumni/:id" });
};

/**
 * GET /api/alumni/query
 * Query alumni by non-URL fields.
 *
 * TODO: Build filters from req.query, reject URL fields with 400, then call queryAlumniService(filters)
 * and return 200 with results. On errors, return 500 with a safe message.
 */
export const queryAlumni = async (req: Request, res: Response): Promise<void> => {
  res.status(501).json({ error: "Not implemented: GET /api/alumni/query" });
};

