import type { NextApiRequest, NextApiResponse } from "next";
import { getGame } from "../../../services/twitch";

interface eSportsGame {
  id: number;
  title: string;
  bannerUrl: string;
  adsCount: number;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<eSportsGame>
) {
  const { gameId } = req.query;

  if (!gameId) return res.status(404);

  const game = await getGame(gameId as string);
  const parsedGame = {
    id: game.id,
    title: game.name,
    bannerUrl: game.box_art_url
      .replace("{width}", "285")
      .replace("{height}", "380"),
    adsCount: 0,
  };
  res.status(200).json(parsedGame);
}
