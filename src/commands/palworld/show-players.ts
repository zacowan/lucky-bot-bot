import { InteractionResponseType } from "discord-interactions";
import type { CommandHandler } from "../types.js";
import { fetchPlayers } from "./utils/palRestApi.js";

/**
 * Using the provided player name, reset the player's saved data from the server.
 * Takes a string delimited by commas and a space as input for each player name.
 *
 * Specifically:
 * 1. Query the Palworld REST API for the player's game id using the provided player name.
 * 2. Shut down the server using the Palworld REST API.
 * 3. Wait for 5 seconds to avoid backup regeneration.
 * 4. Delete the save data file for the player from the file system.
 */
export const showPlayers: CommandHandler = async (data, res) => {
  const errorMessage = "Failed to fetch players. Server may be paused or down.";
  try {
    const players = await fetchPlayers();
    const playerList = players.map((player) => player.name);
    res.send({
      type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
      data: {
        content: `Player(s) in server:\n${playerList.join("\n")}`,
      },
    });
  } catch (error) {
    console.error(error);
    res.send({
      type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
      data: {
        content: errorMessage,
      },
    });
    return;
  }
};
