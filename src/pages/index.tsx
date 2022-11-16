import axios from "axios";
import Image from "next/image";

import { useEffect, useState } from "react";
import { GameBanner, GameBannerProps } from "../components/GameBanner";

import * as Dialog from "@radix-ui/react-dialog";

import logoImg from "../assets/logo.svg";
import { CreateAdBanner } from "../components/CreateAdBanner";
import { CreateAdModal } from "../components/Form/CreateAdModal";

interface GameCount {
  count: number;
  game_id: number;
}
interface GameCountIndex {
  [key: number]: number;
}

export default function Home() {
  const [games, setGames] = useState<GameBannerProps[]>([]);

  const fetchTopGames = async () => {
    const topGamesRequest = await axios.get("/api/games/top");
    const topGames = await topGamesRequest.data;
    setGames(topGames);
  };

  useEffect(() => {
    fetchTopGames();
  }, []);

  return (
    <div className="max-w-[1344px] mx-auto flex flex-col items-center mt-20">
      <Image src={logoImg} alt="esports" />
      <h1 className="text-6xl text-white font-black mt-20">
        Your{" "}
        <span className="bg-duo-gradient bg-clip-text text-transparent">
          duo
        </span>{" "}
        is here.
      </h1>
      <div className="grid grid-cols-6 gap-6 mt-16">
        {games.slice(0, 6).map((game) => {
          return (
            <GameBanner
              key={game.id}
              id={game.id}
              bannerUrl={game.bannerUrl}
              title={game.title}
              adsCount={game.adsCount}
            />
          );
        })}
      </div>

      <Dialog.Root>
        <CreateAdBanner />
        <CreateAdModal games={games} />
      </Dialog.Root>
    </div>
  );
}
