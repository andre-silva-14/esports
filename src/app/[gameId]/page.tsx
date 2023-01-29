"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { CaretLeft } from "phosphor-react";
import { AdCard } from "../../components/AdCard";
import { eSportsGame } from "../../types/eSportsGame";

type SimpleGame = Pick<eSportsGame, "title" | "bannerUrl">;

const GamePage = () => {
  const [game, setGame] = useState<SimpleGame>();
  const pathname = usePathname();
  const gameId = pathname?.split("/")[1];

  const fetchGame = async (id: string) => {
    const gameDetailsRequest = await fetch(`/api/games/${id}`, {
      cache: "force-cache",
    });
    const gameDetails = await gameDetailsRequest.json();

    setGame(gameDetails);
  };

  useEffect(() => {
    if (gameId) {
      fetchGame(gameId as string);
    }
  }, [gameId]);
  return (
    <div className="m-20">
      <div className="flex gap-6 items-center">
        <Link href="/" className="inline-block w-10">
          <CaretLeft size={40} color="#A1A1AA" />
        </Link>
        {game && (
          <h1 className="text-3xl text-white font-black m">{game.title}</h1>
        )}
      </div>
      <div className="w-96 h-40 rounded-md overflow-hidden flex items-center mt-10">
        {game && (
          <Image
            src={game.bannerUrl}
            alt={game.title}
            width={300}
            height={100}
          />
        )}
      </div>
      <div className="flex gap-6 mt-8">
        <AdCard />
        <AdCard />
        <AdCard />
      </div>
    </div>
  );
};

export default GamePage;
