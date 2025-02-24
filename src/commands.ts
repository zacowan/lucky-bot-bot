import type {
  APIApplicationCommand,
  ApplicationCommandType,
} from "discord-api-types/v10";

type Command = Omit<
  APIApplicationCommand,
  | "id"
  | "application_id"
  | "version"
  | "default_member_permissions"
  | "type"
  | "options"
> & {
  type?: ApplicationCommandType;
  options?: Command[];
};

export const commands = [
  {
    name: "ping",
    description: "Responds with pong",
  },
  {
    name: "help",
    description: "Displays help information",
  },
  {
    name: "palworld",
    description: "Subcommands for Palworld",
    options: [
      {
        name: "help",
        description: "Displays help information for Palworld commands",
      },
      {
        name: "reset-player",
        description: "Resets the provided player's save data on the server",
      },
    ],
  },
] satisfies Command[];
