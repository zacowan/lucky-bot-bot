import "dotenv/config";
import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { logger } from "hono/logger";
import {
  verifyKey,
  InteractionType,
  InteractionResponseType,
} from "discord-interactions";
import { z } from "zod";
import ngrok from "@ngrok/ngrok";

const envSchema = z.object({
  PUBLIC_KEY: z.string().nonempty(),
  APP_ID: z.string().nonempty(),
  BOT_TOKEN: z.string().nonempty(),
  NODE_ENV: z.enum(["development", "production"]).default("development"),
});

const { PUBLIC_KEY, NODE_ENV } = envSchema.parse(process.env);

const app = new Hono();

app.use(logger());

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

/**
 * Middleware to verify the request signature and verify that the body has a key.
 * @see https://github.com/discord/discord-interactions-js.
 */
app.use("/interactions", async (c, next) => {
  const signature = c.req.header("X-Signature-Ed25519");
  const timestamp = c.req.header("X-Signature-Timestamp");

  const bodyText = await c.req.text();

  if (!signature || !timestamp || !bodyText) {
    return c.json({ error: "Missing headers" }, 400);
  }

  if (!verifyKey(bodyText, signature, timestamp, PUBLIC_KEY)) {
    return c.json({ error: "Invalid request signature" }, 401);
  }

  // const bodyJson = (await clonedRawReq2.json()) || {};
  // if (bodyJson.type === InteractionType.PING) {
  //   console.log("middleware ping");
  //   return c.json({ type: InteractionResponseType.PONG }, 200, {
  //     "Content-Type": "application/json",
  //   });
  // }

  c.set("body", bodyText);

  await next();
});

app.post("/interactions", async (c) => {
  const { id, type, data } = await c.req.json();

  /**
   * Handle verification requests
   */
  if (type === InteractionType.PING) {
    console.log("Ping received");
    return c.json({ type: InteractionResponseType.PONG }, 200, {
      "Content-Type": "application/json",
    });
  }

  if (type === InteractionType.APPLICATION_COMMAND) {
    const { name } = data as { name: string };
    console.log("Command received", name);

    if (name === "test") {
      return c.json(
        {
          type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
          data: {
            content: "Hello, world!",
          },
        },
        200,
        {
          "Content-Type": "application/json",
        }
      );
    }
  }

  return c.text("hello");
});

serve(
  {
    fetch: app.fetch,
    port: 3000,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  }
);

if (NODE_ENV === "development") {
  const listener = await ngrok.forward({
    addr: 3000,
    authtoken_from_env: true,
  });

  console.log(`Ingress established at: ${listener.url()}`);
}
