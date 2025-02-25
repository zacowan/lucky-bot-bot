import { resetPlayer } from "./reset-player.js";
import { showPlayers } from "./show-players.js";
import { unknown } from "../unknown.js";
import type { CommandHandler } from "../types.js";

export const palworld: CommandHandler = async (data, res) => {
  const { options } = data as { options: { name: string }[] };
  const subcommand = options.at(0);
  if (!subcommand) {
    res.status(400).json({ error: "unknown command" });
    return;
  }

  switch (subcommand.name) {
    case "reset-player":
      await resetPlayer(subcommand, res);
      return;
    case "show-players":
      await showPlayers(subcommand, res);
      return;
    default:
      await unknown(null, res);
      return;
  }
};
