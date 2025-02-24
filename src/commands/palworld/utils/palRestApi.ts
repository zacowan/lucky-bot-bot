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

const abortTimeout = 2000;
const headers = new Headers();
headers.set("Content-Type", "application/json");
headers.set(
  "Authorization",
  "Basic " + Buffer.from(REST_USER + ":" + REST_PASS).toString("base64"),
);

/*
/ Fetches the list of players from the Palworld server.
/ Does not handle errors, catch them and respond with a chat message in calling functions.
*/

export const fetchPlayers = async () => {
  const playersResponse = await fetch(`${REST_URL}/v1/api/players`, {
    method: "GET",
    headers,
    signal: AbortSignal.timeout(abortTimeout),
  });
  const playerJson = (await playersResponse.json()) as PlayersResponse;
  return playerJson.players;
};

/*
/ Shuts down the Palworld server.
/ Does not handle errors, catch them and respond with a chat message in calling functions.
*/

export const shutdownServer = async () => {
  await fetch(`${REST_URL}/v1/api/shutdown`, {
    method: "POST",
    headers,
    body: JSON.stringify({
      waittime: 1,
      message: "Server shutting down for character reset.",
    }),
    signal: AbortSignal.timeout(abortTimeout),
  });
};
