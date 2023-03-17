import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../lib/prisma";
import { getGame } from "../../../../services/twitch";
import { eSportsGame } from "../../../../types/eSportsGame";

const PrismaQuery = async (gameId: string | string[]) => {
  try {
    return await prisma.ad.groupBy({
      by: ["gameId"],
      _count: true,
      where: {
        gameId: Number(gameId),
      },
    });
  } catch (error) {
    console.error(error);
    return [];
  }
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<eSportsGame>
) {
  const { gameId } = req.query;

  if (!gameId) return res.status(404);

  const game = await getGame(gameId as string);

  const adCount = await PrismaQuery(gameId);

  const parsedGame = {
    id: game.id,
    title: game.name,
    bannerUrl: game.box_art_url
      .replace("{width}", "285")
      .replace("{height}", "380"),
    adsCount: adCount[0] ? adCount[0]._count : 0,
  };
  res.status(200).json(parsedGame);
}
