import axios from "axios";
import { TwitchGame } from "../types/twitchGame";

const TOP_COUNT = 25;
const EXCLUDED_IDS = [
  509658, 417752, 498566, 518203, 26936, 488190, 29452, 509659, 509660,
  1469308723, 509667, 116747788, 509663,
];

const OAuthUrl = "https://id.twitch.tv/oauth2/token";
const getTopGamesUrl = `https://api.twitch.tv/helix/games/top?first=${TOP_COUNT}`;
const getGameUrl = "https://api.twitch.tv/helix/games";

const data = new URLSearchParams({
  client_id: process.env.TWITCH_CLIENT_ID as any,
  client_secret: process.env.TWITCH_CLIENT_SECRET as any,
  grant_type: "client_credentials",
});

const getOAuthToken = async () => {
  const OAuthRequest = await axios.post(OAuthUrl, data);

  const { access_token } = await OAuthRequest.data;

  return access_token;
};

const getTopGames = async (): Promise<TwitchGame[]> => {
  const OAuthToken = await getOAuthToken();
  const topGamesRequest = await axios.get(getTopGamesUrl, {
    headers: {
      Authorization: `Bearer ${OAuthToken}`,
      "Client-Id": process.env.TWITCH_CLIENT_ID,
    },
  });

  return await topGamesRequest.data.data.filter(
    (game: TwitchGame) => !EXCLUDED_IDS.includes(Number(game.id))
  );
};

const getGame = async (id: string): Promise<TwitchGame> => {
  const OAuthToken = await getOAuthToken();
  const gameRequest = await axios.get(getGameUrl, {
    headers: {
      Authorization: `Bearer ${OAuthToken}`,
      "Client-Id": process.env.TWITCH_CLIENT_ID,
    },
    params: {
      id: id,
    },
  });

  return await gameRequest.data.data[0];
};

export { getTopGames, getGame };
