import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v10";
import { loadEnv } from "../src/env.js";

const { BOT_TOKEN, APP_ID, GUILD_ID } = loadEnv();

const commands = [
  {
    name: "test",
    description: "Lucky Bot Bot test command",
  },
];

const rest = new REST({ version: "10" }).setToken(BOT_TOKEN);

(async () => {
  try {
    console.log("Registering slash command...");
    await rest.put(Routes.applicationGuildCommands(APP_ID, GUILD_ID), {
      body: commands,
    });
    console.log("Slash command registered successfully!");
  } catch (error) {
    console.error("Error registering command:", error);
  }
})();
