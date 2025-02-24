import { InteractionResponseType } from "discord-interactions";
import type { RequestHandler } from "express";

export const resetPlayer: RequestHandler = async (req, res) => {
  res.send({
    type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
    data: {
      content: "Reset player has not been implemented yet.",
    },
  });
};
