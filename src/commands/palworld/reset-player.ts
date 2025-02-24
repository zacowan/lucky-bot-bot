import { InteractionResponseType } from "discord-interactions";
import type { CommandHandler } from "../types.js";
import { fetchPlayers, shutdownServer } from "./utils/palRestApi.js";
import fs from "fs/promises";

/**
 * Using the provided player name, reset the player's saved data from the server.
 *
 * Specifically:
 * 1. Query the Palworld REST API for the player's game id using the provided player name.
 * 2. Shut down the server using the Palworld REST API.
 * 3. Wait for 5 seconds to avoid backup regeneration.
 * 4. Delete the save data file for the player from the file system.
 */
export const resetPlayer: CommandHandler = async (data, res) => {
  const { options } = data as { options: { name: string; value: string }[] };
  const value = options?.[0]?.value;
  let errorMessage = "Failed to fetch players. Server may be paused or down.";
  try {
    const players = await fetchPlayers();
    const player = players.find((player) => player.name === value);
    if (!player) {
      errorMessage = `Player ${value} not found. Is the player logged in?`;
      throw new Error(errorMessage);
    }

    const playerId = player.playerId;
    const saveDirectory = `/palworld/Pal/Saved/SaveGames/0/`;
    const worldDirectory = await fs.readdir(saveDirectory);
    const worldId = worldDirectory[0];
    const saveFile = `${saveDirectory}/${worldId}/Players/${playerId}.sav`;

    errorMessage = `Save file for ${value} not found.`;
    await fs.access(saveFile);

    console.log(
      `Found save file for ${value} at ${[playerId]}, shutting down server.`,
    );

    errorMessage = "Failed to shut down server.";
    await shutdownServer();

    res.send({
      type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
      data: {
        content: `Player ${value} reset successfuly. Resetting server now.`,
      },
    });

    await new Promise((resolve) => setTimeout(resolve, 5000));
    await fs.rm(saveFile);
    console.log(`Deleted ${saveFile}`);
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
