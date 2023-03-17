import type { Ad } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../../lib/prisma";
import { AdSchema } from "../../../../../schemas/adSchema";

const PrismaQueryGET = async (gameId: string | string[] | undefined) => {
  try {
    return await prisma.ad.findMany({
      where: { gameId: Number(gameId) },
    });
  } catch (error) {
    console.error(error);
    return [];
  }
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Ad | Ad[]>
) {
  if (req.method === "GET") {
    const { gameId } = req.query;
    const ads = await PrismaQueryGET(gameId);

    const parsedJSON = JSON.parse(
      JSON.stringify(ads, (key, value) =>
        typeof value === "bigint" ? value.toString() : value
      )
    );

    res.status(200).json(parsedJSON);
  } else if (req.method === "POST") {
    const ad: Ad = req.body;

    const { gameId } = req.query;

    const parsedAd = AdSchema.parse({
      gameId: BigInt(gameId as string),
      name: ad.name,
      expertise: ad.expertise,
      discord: ad.discord,
      weekDays: ad.weekDays,
      hourStart: ad.hourStart,
      hourEnd: ad.hourEnd,
      useVoiceChannel: ad.useVoiceChannel,
    });

    const status = await prisma.ad.create({
      data: parsedAd,
    });

    if (!status) res.status(500).json(status);

    res.status(201).json(ad);
  } else {
    res.status(404);
  }
}
