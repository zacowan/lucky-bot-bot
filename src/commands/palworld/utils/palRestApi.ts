import { loadEnv } from "../../../env.js";

const { REST_URL, REST_USER, REST_PASS } = loadEnv();
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

const headers = new Headers();
headers.set("Content-Type", "application/json");
headers.set(
  "Authorization",
  "Basic " + Buffer.from(REST_USER + ":" + REST_PASS).toString("base64"),
);

export const fetchPlayers = async () => {
  try {
    const playersResponse = await fetch(`${REST_URL}/v1/api/players`, {
      method: "GET",
      headers,
    });
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
      headers,
      body: JSON.stringify({
        waittime: 1,
        message: "Server shutting down for character reset.",
      }),
    });
  } catch (error) {
    console.error(error);
  }
};
