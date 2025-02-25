import type { Response } from "express";

export type CommandHandler = (data: unknown, res: Response) => Promise<void>;

export type PlayersResponse = {
  players: Array<PlayerObject>;
};
export type PlayerObject = {
  name: string;
  accountName: string;
  playerId: string;
  ip: string;
  ping: number;
  location_x: number;
  location_y: number;
  level: number;
  building_count: number;
};
