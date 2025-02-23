import express from "express";
import {
  InteractionType,
  InteractionResponseType,
  verifyKeyMiddleware,
} from "discord-interactions";
import ngrok from "@ngrok/ngrok";
import { loadEnv } from "./env.js";

const { PUBLIC_KEY, NODE_ENV, PORT } = loadEnv();

const app = express();

app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`${timestamp} - ${req.method} ${req.url}`);
  next(); // Pass control to the next middleware or route handler
});

app.post("/interactions", verifyKeyMiddleware(PUBLIC_KEY), async (req, res) => {
  const { type, data } = req.body;

  /**
   * Handle verification requests
   */
  if (type === InteractionType.PING) {
    res.send({ type: InteractionResponseType.PONG });
    return;
  }

  if (type === InteractionType.APPLICATION_COMMAND) {
    const { name } = data as { name: string };
    console.log("Command received", name);

    if (name === "test") {
      res.send({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
          content: "Hello, world!",
        },
      });
      return;
    }
  }

  console.error("unknown interaction type", type);
  res.status(400).json({ error: "unknown interaction type" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

if (NODE_ENV === "development") {
  const listener = await ngrok.forward({
    addr: PORT,
    authtoken_from_env: true,
  });

  console.log(`Ingress established at: ${listener.url()}`);
}
