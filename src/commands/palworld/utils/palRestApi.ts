import { loadEnv } from "../../../env.js";

const { REST_URL } = loadEnv();
type PlayersResponse = {
  players: Array<{
    name: string;
    accountName: string;
    playerId: string;
    ip: string;
    ping: number;
    location_x: number;
    location_y: number;
    level: number;
    building_count: number;
  }>;
};

export const fetchPlayers = async () => {
  try {
    const playersResponse = await fetch(`${REST_URL}/v1/api/players`);
    const playerJson = (await playersResponse.json()) as PlayersResponse;
    return playerJson.players;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const shutdownServer = async () => {
  try {
    await fetch(`${REST_URL}/v1/api/shutdown`, {
      method: "POST",
      body: JSON.stringify({
        waittime: 1,
        message: "Server shutting down for character reset.",
      }),
    });
  } catch (error) {
    console.error(error);
  }
};
