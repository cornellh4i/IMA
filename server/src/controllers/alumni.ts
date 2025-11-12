import { Request, Response } from "express";
import {
  getAllAlumniService,
  getAlumniByIdService,
  queryAlumniService,
} from "../services/alumniServices";
import { alumniUrlFields } from "../models/alumni";

/**
 * GET /api/alumni
 * Return all alumni.
 */
export const getAllAlumni = async (req: Request, res: Response): Promise<void> => {
  try {
    const alumni = await getAllAlumniService();
    res.status(200).json(alumni);
  } catch (error) {
    console.error("Error fetching alumni:", error);
    res.status(500).json({ error: "Failed to fetch alumni" });
  }
};

/**
 * GET /api/alumni/:id
 * Return a single alumni by id.
 */
export const getAlumniById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    if (!id) {
      res.status(400).json({ error: "Alumni ID is required" });
      return;
    }

    const alumni = await getAlumniByIdService(id);
    res.status(200).json(alumni);
  } catch (error) {
    console.error("Error fetching alumni:", error);
    if (error instanceof Error && error.message === "Alumni not found") {
      res.status(404).json({ error: "Alumni not found" });
    } else if (error instanceof Error && error.message === "Alumni ID is required") {
      res.status(400).json({ error: "Alumni ID is required" });
    } else {
      res.status(500).json({ error: "Failed to fetch alumni" });
    }
  }
};

/**
 * GET /api/alumni/query
 * Query alumni by non-URL fields.
 */
export const queryAlumni = async (req: Request, res: Response): Promise<void> => {
  try {
    const filters = req.query;

    // Check if any URL fields are present in the query
    const urlFieldsInQuery = Object.keys(filters).filter((key) =>
      alumniUrlFields.includes(key)
    );

    if (urlFieldsInQuery.length > 0) {
      res.status(400).json({
        error: `URL fields cannot be used in query filters: ${urlFieldsInQuery.join(", ")}`,
      });
      return;
    }

    const alumni = await queryAlumniService(filters as Record<string, unknown>);
    res.status(200).json(alumni);
  } catch (error) {
    console.error("Error querying alumni:", error);
    res.status(500).json({ error: "Failed to query alumni" });
  }
};

