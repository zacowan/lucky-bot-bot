import type { CommandHandler } from "./types.js";

export const unknown: CommandHandler = async (data, res) => {
  res.status(400).json({ error: "unknown command" });
};
