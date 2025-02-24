import type { RequestHandler } from "express";
import { resetPlayer } from "./reset-player.js";
import { unknown } from "../unknown.js";

export const palworld: RequestHandler = async (req, res, next) => {
  const { data } = req.body;

  const { options } = data as { options: { name: string }[] };
  const subcommand = options?.[0]?.name;
  if (!subcommand) {
    res.status(400).json({ error: "unknown command" });
    return;
  }

  switch (subcommand) {
    case "reset-player":
      await resetPlayer(req, res, next);
      return;
    default:
      await unknown(req, res, next);
      return;
  }
};
