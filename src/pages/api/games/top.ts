import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";
import { getTopGames } from "../../../services/twitch";
import { eSportsGame } from "../../../types/eSportsGame";

const PrismaQuery = async () => {
  try {
    return await prisma.ad.groupBy({
      by: ["gameId"],
      _count: true,
    });
  } catch (error) {
    console.error(error);
    return [];
  }
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<eSportsGame[]>
) {
  const topGames = await getTopGames();
  const adCountMap = await PrismaQuery();

  const countFilter = (id: bigint) => {
    const gameMap = adCountMap.find((map) => map.gameId === id);
    const count = gameMap?._count;

    return count ? count : 0;
  };

  const parsedGames = topGames.map((game) => {
    return {
      id: Number(game.id),
      title: game.name,
      bannerUrl: game.box_art_url
        .replace("{width}", "285")
        .replace("{height}", "380"),
      adsCount: countFilter(BigInt(game.id)),
    };
  });
  res.status(200).json(parsedGames);
}
