import { InteractionResponseType } from "discord-interactions";
import type { RequestHandler } from "express";

export const help: RequestHandler = async (req, res) => {
  res.send({
    type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
    data: {
      content:
        "Dispose of your childish notions and embrace the power of the void.",
    },
  });
};
