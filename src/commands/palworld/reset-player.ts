import { InteractionResponseType } from "discord-interactions";
import type { CommandHandler } from "../types.js";
// import { loadEnv } from "./env.js";

/**
 * Using the provided player name, reset the player's saved data from the server.
 *
 * Specifically:
 * 1. Query the Palworld REST API for the player's game id using the provided player name.
 * 2. Delete the save data file for the player from the file system.
 * 3. Use the Palworld REST API to send a message to the server telling players to leave ASAP to leave the server.
 */
export const resetPlayer: CommandHandler = async (data, res) => {
  // const { options } = data as { options: { name: string; value: string }[] };

  // const value = options?.[0]?.value;

  // await fetch(`${}/v1/api/players`);

  res.send({
    type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
    data: {
      content: "Reset player has not been implemented yet.",
    },
  });
};
