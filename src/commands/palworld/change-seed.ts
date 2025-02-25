import { InteractionResponseType } from "discord-interactions";
import type { CommandHandler } from "../types.js";
import { shutdownServer } from "./utils/palRestApi.js";
import fs from "fs/promises";
import path from "path";

/**
 * Changes the world seed, deletes the current world, and resets the server.
 *
 * Specifically:
 * 1. Modify the root .env file to change the seed to the requested value.
 * 2. Shut down the server using the Palworld REST API.
 * 3. Wait for 5 seconds to avoid backup regeneration.
 * 4. Delete the save directory for the world.
 */
export const changeSeed: CommandHandler = async (data, res) => {
  const { options } = data as { options: { name: string; value: string }[] };
  const newSeed = options?.[0]?.value || "";
  let errorMessage = "Failed to read config.";
  try {
    const envPath = path.resolve("/app/palConfig/.env");
    const envContent = await fs.readFile(envPath, "utf-8");
    const updatedContent = envContent.replace(
      /RANDOMIZER_SEED=.*/,
      "RANDOMIZER_SEED=" + newSeed,
    );
    errorMessage = "Failed to write new seed to config";
    await fs.writeFile(envPath, updatedContent);

    errorMessage = "Failed to shut down server.";
    await shutdownServer();

    res.send({
      type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
      data: {
        content: `Seed changed to ${newSeed}. Resetting server now.`,
      },
    });

    await new Promise((resolve) => setTimeout(resolve, 5000));
    const saveDirectory = `/palworld/Pal/Saved/SaveGames/0`;
    await fs.rmdir(saveDirectory);
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
