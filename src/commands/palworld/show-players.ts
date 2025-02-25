import { InteractionResponseType } from "discord-interactions";
import type { CommandHandler } from "../types.js";
import { fetchPlayers } from "./utils/palRestApi.js";

/**
 * Uses the Palworld REST API to fetch the list of players currently on the server.
 * Displays each player online and their respective level.
 */
export const showPlayers: CommandHandler = async (data, res) => {
  const errorMessage = "Failed to fetch players. Server may be paused or down.";
  try {
    const players = await fetchPlayers();
    const playerList = players.map(
      (player) => `${player.name} - Level ${player.level}`,
    );
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
