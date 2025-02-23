import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  PUBLIC_KEY: z.string().nonempty(),
  APP_ID: z.string().nonempty(),
  GUILD_ID: z.string().nonempty(),
  BOT_TOKEN: z.string().nonempty(),
  NODE_ENV: z.enum(["development", "production"]).default("development"),
  PORT: z
    .string()
    .default("5432")
    .transform((val) => Number.parseInt(val)),
});

export const loadEnv = () => envSchema.parse(process.env);
