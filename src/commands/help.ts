import { InteractionResponseType } from "discord-interactions";
import type { CommandHandler } from "./types.js";

export const help: CommandHandler = async (data, res) => {
  res.send({
    type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
    data: {
      content:
        "Dispose of your childish notions and embrace the power of the void.",
    },
  });
};
