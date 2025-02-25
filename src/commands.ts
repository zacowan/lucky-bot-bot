import {
  ApplicationCommandOptionType,
  ApplicationCommandType,
  type APIApplicationCommandOption,
  type APIApplicationCommand,
} from "discord-api-types/v10";

type ApplicationCommand = Omit<
  APIApplicationCommand,
  "id" | "application_id" | "default_member_permissions" | "version"
>;

export type Command = APIApplicationCommandOption | ApplicationCommand;

export const commands = {
  help: {
    name: "help",
    description: "Displays help information",
    type: ApplicationCommandOptionType.Subcommand,
  },
  palworld: {
    name: "palworld",
    description: "Subcommands for Palworld",
    type: ApplicationCommandType.ChatInput,
    options: [
      {
        name: "reset-player",
        description: "Resets the provided player's save data on the server",
        type: ApplicationCommandOptionType.Subcommand,
        options: [
          {
            name: "player-name",
            description:
              "Player name to be reset. Use the name associated with the platform you plan on.",
            type: ApplicationCommandOptionType.String,
          },
        ],
      },
      {
        name: "show-players",
        description: "Shows the list of players currently on the server",
        type: ApplicationCommandOptionType.Subcommand,
      },
      {
        name: "change-seed",
        description: "Changes the world seed and resets the world.",
        type: ApplicationCommandOptionType.Subcommand,
        options: [
          {
            name: "seed",
            description: "New seed to use for randomizer world generation.",
            type: ApplicationCommandOptionType.String,
          },
        ],
      },
    ],
  },
} satisfies {
  [key: string]: Command;
};
