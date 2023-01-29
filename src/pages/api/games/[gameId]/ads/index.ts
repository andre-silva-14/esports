import type { Ad } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../../lib/prisma";
import { AdSchema } from "../../../../../schemas/adSchema";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Ad>
) {
  if (req.method === "POST") {
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
