import type { RequestHandler } from "express";

export const unknown: RequestHandler = async (req, res) => {
  res.status(400).json({ error: "unknown command" });
};
