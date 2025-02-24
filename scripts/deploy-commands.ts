import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v10";
import { loadEnv } from "../src/env.js";
import { commands, type Command } from "../src/commands.js";

const { BOT_TOKEN, APP_ID, GUILD_ID } = loadEnv();

const rest = new REST({ version: "10" }).setToken(BOT_TOKEN);

const commandsAsArray = Object.values(commands) satisfies Command[];

console.log(commandsAsArray);

try {
  console.log("Registering slash commands...");
  await rest.put(Routes.applicationGuildCommands(APP_ID, GUILD_ID), {
    body: commandsAsArray,
  });
  console.log("Slash commands registered successfully!");
} catch (error) {
  console.error("Error registering commands:", error);
}
