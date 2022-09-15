import "./styles/main.css";

import { SupabaseClient } from "@supabase/supabase-js";
import { useEffect } from "react";
import { GameBanner } from "./components/GameBanner";
import { supabase } from "./services/supabase";
import { getTopGames } from "./services/twitch";

import logoImg from "./assets/logo.svg";
import searchIcon from "./assets/MagnifyingGlassPlus.svg";

function App() {
  useEffect(() => {
    const fetchData = async (supabase: SupabaseClient) => {
      let { data: game_listings, error } = await supabase
        .from("game_listings")
        .select("name");

      console.log(game_listings);

      const topGames = await getTopGames();
      console.log(topGames); // size 285x380
    };

    fetchData(supabase);
  }, []);

  return (
    <div className="max-w-[1344px] mx-auto flex flex-col items-center my-20">
      <img src={logoImg} alt="esports" />
      <h1 className="text-6xl text-white font-black mt-20">
        Your{" "}
        <span className="bg-duo-gradient bg-clip-text text-transparent">
          duo
        </span>{" "}
        is here.
      </h1>
      <div className="grid grid-cols-6 gap-6 mt-16">
        <GameBanner />
        <GameBanner />
        <GameBanner />
        <GameBanner />
        <GameBanner />
        <GameBanner />
      </div>

      <div className="pt-1 mt-8 bg-duo-gradient self-stretch rounded-lg overflow-hidden">
        <div className="bg-[#2A2634] py-6 px-8 self-stretch rounded flex justify-between items-center">
          <div>
            <strong className="text-2xl text-white font-black block">
              Didn't find your duo?
            </strong>
            <span className="text-zinc-400 mt-1 block">
              Publish a listing to find new players!
            </span>
          </div>
          <button className="py-3 px-4 bg-violet-500 text-white rounded flex gap-3 transition-colors hover:bg-violet-600">
            <img src={searchIcon} alt="Magnifying Glass Icon" />
            Publish Listing
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
