import type { Response } from "express";

export type CommandHandler = (data: unknown, res: Response) => Promise<void>;
