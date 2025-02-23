import "dotenv/config";
import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { verifyKey } from "discord-interactions";
import { z } from "zod";

const envSchema = z.object({
  PUBLIC_KEY: z.string().nonempty(),
  APP_ID: z.string().nonempty(),
  DISCORD_TOKEN: z.string().nonempty(),
});

const { PUBLIC_KEY } = envSchema.parse(process.env);

const app = new Hono();

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

  if (!signature || !timestamp || !c.req.raw.body) {
    return c.json({ error: "Missing headers" }, 400);
  }

  // Convert the readable stream to a buffer
  const chunks: Uint8Array[] = [];
  for await (const chunk of c.req.raw.body) {
    chunks.push(new Uint8Array(chunk));
  }
  const bodyBuffer = Buffer.concat(chunks);

  if (!verifyKey(bodyBuffer, signature, timestamp, PUBLIC_KEY)) {
    return c.json({ error: "Invalid request signature" }, 401);
  }

  await next();
});

app.post("/interactions", (c) => {
  // TOOD: discord interactions
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
