import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v10";
import { loadEnv } from "../src/env.js";
import { commands } from "../src/commands.js";

const { BOT_TOKEN, APP_ID, GUILD_ID } = loadEnv();

const rest = new REST({ version: "10" }).setToken(BOT_TOKEN);

try {
  console.log("Registering slash commands...");
  await rest.put(Routes.applicationGuildCommands(APP_ID, GUILD_ID), {
    body: commands,
  });
  console.log("Slash commands registered successfully!");
} catch (error) {
  console.error("Error registering commands:", error);
}
