import axios from "axios";

interface TwitchGame {
  id: number;
  name: string;
  box_art_url: string;
}

const TOP_COUNT = 25;
const EXCLUDED_IDS = [
  509658, 417752, 498566, 518203, 26936, 488190, 29452, 509659, 509660,
  1469308723, 509667, 116747788,
];

const OAuthUrl = "https://id.twitch.tv/oauth2/token";
const getTopGamesUrl = `https://api.twitch.tv/helix/games/top?first=${TOP_COUNT}`;

const data = new URLSearchParams({
  client_id: import.meta.env.VITE_TWITCH_CLIENT_ID,
  client_secret: import.meta.env.VITE_TWITCH_CLIENT_SECRET,
  grant_type: "client_credentials",
});

const getOAuthToken = async () => {
  const OAuthRequest = await axios.post(OAuthUrl, data);

  const { access_token } = await OAuthRequest.data;

  return access_token;
};

const getTopGames = async () => {
  const OAuthToken = await getOAuthToken();
  const topGamesRequest = await axios.get(getTopGamesUrl, {
    headers: {
      Authorization: `Bearer ${OAuthToken}`,
      "Client-Id": import.meta.env.VITE_TWITCH_CLIENT_ID,
    },
  });

  return await topGamesRequest.data.data.filter(
    (game: TwitchGame) => !EXCLUDED_IDS.includes(Number(game.id))
  );
};

export { getTopGames };
export type { TwitchGame };
