import "./styles/main.css";

import { PostgrestResponse, SupabaseClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { GameBanner, GameBannerProps } from "./components/GameBanner";
import { supabase } from "./services/supabase";
import { getTopGames } from "./services/twitch";

import * as Dialog from "@radix-ui/react-dialog";

import logoImg from "./assets/logo.svg";
import { CreateAdBanner } from "./components/CreateAdBanner";
import { CreateAdModal } from "./components/Form/CreateAdModal";

interface GameCount {
  count: number;
  game_id: number;
}
interface GameCountIndex {
  [key: number]: number;
}

function App() {
  const [games, setGames] = useState<GameBannerProps[]>([]);

  const fetchGameCounts = async (supabase: SupabaseClient) => {
    const { data: gameListings, error } = (await supabase
      .from("grouped_game_listings")
      .select("*")) as PostgrestResponse<GameCount>;

    const gameCountIndex: GameCountIndex = {};
    gameListings?.forEach(
      (item) => (gameCountIndex[item.game_id] = item.count)
    );

    return gameCountIndex;
  };

  const fetchTopGames = async (gameCountIndex: GameCountIndex) => {
    const topGames = await getTopGames();
    const parsedGames = topGames.map((game) => {
      return {
        id: game.id,
        title: game.name,
        bannerUrl: game.box_art_url
          .replace("{width}", "285")
          .replace("{height}", "380"),
        adsCount: gameCountIndex[game.id] || 0,
      };
    });
    setGames(parsedGames);
  };

  useEffect(() => {
    const fetchData = async (supabase: SupabaseClient) => {
      const gameCountIndex = await fetchGameCounts(supabase);
      fetchTopGames(gameCountIndex);
    };

    fetchData(supabase);
  }, []);

  return (
    <div className="max-w-[1344px] mx-auto flex flex-col items-center mt-20">
      <img src={logoImg} alt="esports" />
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

export default App;
