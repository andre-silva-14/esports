import "./styles/main.css";

import { PostgrestResponse, SupabaseClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { GameBanner, GameBannerProps } from "./components/GameBanner";
import { supabase } from "./services/supabase";
import { getTopGames } from "./services/twitch";

import * as Dialog from "@radix-ui/react-dialog";
import GameControllerIcon from "./assets/GameController.svg";
import logoImg from "./assets/logo.svg";
import { CreateAdBanner } from "./components/CreateAdBanner";
import { Input } from "./components/Form/Input";

interface GameCount {
  count: number;
  game_id: number;
}
interface GameCountIndex {
  [key: number]: number;
}

function App() {
  const [games, setGames] = useState<GameBannerProps[]>([]);

  useEffect(() => {
    const fetchData = async (supabase: SupabaseClient) => {
      const { data: gameListings, error } = (await supabase
        .from("grouped_game_listings")
        .select("*")) as PostgrestResponse<GameCount>;

      const gameCountIndex: GameCountIndex = {};
      gameListings?.forEach(
        (item) => (gameCountIndex[item.game_id] = item.count)
      );

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

        <Dialog.Portal>
          <Dialog.Overlay className="bg-black/60 inset-0 fixed">
            <Dialog.Content className="fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[560px] shadow-lg shadow-black/25">
              <Dialog.Title className="text-3xl font-black">
                Publish a listing
              </Dialog.Title>
              <form className="mt-8 flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <label htmlFor="game">Which game?</label>
                  <Input
                    placeholder="Select the game you wish to play"
                    id="game"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="name">Your name (or nickname)</label>
                  <Input id="name" placeholder="How you want to be called?" />
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="expertise">
                      What's your expertise level?
                    </label>
                    <Input id="expertise" placeholder="Choose a level..." />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="discord">What's your discord?</label>
                    <Input id="discord" placeholder="User#0000" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="daysPlaying">Daily Schedule</label>
                    <div className="grid grid-cols-5 gap-1">
                      <button
                        title="Monday"
                        className="h-9 rounded bg-zinc-900"
                      >
                        M
                      </button>
                      <button
                        title="Tuesday"
                        className="h-9 rounded bg-zinc-900"
                      >
                        T
                      </button>
                      <button
                        title="Wednesday"
                        className="h-9 rounded bg-zinc-900"
                      >
                        W
                      </button>
                      <button
                        title="Thursday"
                        className="h-9 rounded bg-zinc-900"
                      >
                        T
                      </button>
                      <button
                        title="Friday"
                        className="h-9 rounded bg-zinc-900"
                      >
                        F
                      </button>
                      <button
                        title="Weekend"
                        className="h-9 rounded bg-zinc-900 col-span-5"
                      >
                        Weekend
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="hourStart">During which hours?</label>
                    <div className="grid grid-cols-2 gap-2">
                      <Input id="hourStart" type="time" placeholder="From" />
                      <Input id="hourEnd" type="time" placeholder="Until" />
                    </div>
                  </div>
                </div>

                <div className="mt-1 flex gap-2 text-sm">
                  <Input type="checkbox" />I want to connect via Voice Chat
                </div>

                <footer className="mt-4 flex justify-end gap-4">
                  <Dialog.Close className="bg-zinc-500 px-5 h-12 rounded-md font-semibold transition-colors hover:bg-zinc-600">
                    Cancel
                  </Dialog.Close>
                  <button
                    type="submit"
                    className="bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 transition-colors hover:bg-violet-600"
                  >
                    <img
                      className="w-6 h-6"
                      src={GameControllerIcon}
                      alt="Game Controller"
                    />
                    Find Duo
                  </button>
                </footer>
              </form>
            </Dialog.Content>
          </Dialog.Overlay>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}

export default App;
