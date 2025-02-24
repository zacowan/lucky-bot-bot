import { InteractionResponseType } from "discord-interactions";
import type { CommandHandler } from "../types.js";
import { fetchPlayers, shutdownServer } from "./utils/palRestApi.js";
import fs from "fs/promises";

/**
 * Using the provided player name, reset the player's saved data from the server.
 *
 * Specifically:
 * 1. Query the Palworld REST API for the player's game id using the provided player name.
 * 2. Delete the save data file for the player from the file system.
 * 3. Use the Palworld REST API to send a message to the server telling players to leave ASAP to leave the server.
 */
export const resetPlayer: CommandHandler = async (data, res) => {
  const { options } = data as { options: { name: string; value: string }[] };

  const value = options?.[0]?.value;
  const players = await fetchPlayers();
  if (!players) {
    res.send({
      type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
      data: {
        content: "Failed to fetch players. Server may be paused or down.",
      },
    });
    return;
  }

  const player = players.find((player) => player.name === value);
  if (!player) {
    res.send({
      type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
      data: {
        content: `Player ${value} not found. Is the player logged in?`,
      },
    });
    return;
  }

  const playerId = player.playerId;
  const saveDirectory = `/palworld/Pal/Saved/SaveGames/0/`;
  const worldDirectory = await fs.readdir(saveDirectory);
  const worldId = worldDirectory[0];
  const saveFile = `${saveDirectory}/${worldId}/Players/${playerId}.sav`;
  try {
    await fs.access(saveFile);
    console.log(
      `Found save file for ${value} at ${saveFile}, shutting down server.`,
    );
    await shutdownServer();
    await new Promise((resolve) => setTimeout(resolve, 1000));
    await fs.rm(saveFile);
    console.log(`Deleted ${saveFile}`);
  } catch (error) {
    console.error(error);
    res.send({
      type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
      data: {
        content: `Failed to reset player ${value}.`,
      },
    });
    return;
  }

  res.send({
    type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
    data: {
      content: `Player ${value} reset successfuly. Resetting server now.`,
    },
  });
};
