import "./styles/main.css";

import { PostgrestResponse, SupabaseClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { GameBanner, GameBannerProps } from "./components/GameBanner";
import { supabase } from "./services/supabase";
import { getTopGames, TwitchGame } from "./services/twitch";

import * as Dialog from "@radix-ui/react-dialog";
import GameControllerIcon from "./assets/GameController.svg";
import logoImg from "./assets/logo.svg";
import { CreateAdBanner } from "./components/CreateAdBanner";

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
      const parsedGames = topGames.map((game: TwitchGame) => {
        return {
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
        {games.slice(0, 6).map((game) => {
          return (
            <GameBanner
              key={game.title}
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
            <Dialog.Content className="fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg shadow-black/25">
              <Dialog.Title className="text-3xl font-black">
                Publish a listing
              </Dialog.Title>
              <Dialog.Content>
                <form>
                  <div>
                    <div>
                      <label htmlFor="game">Which game?</label>
                      <input
                        placeholder="Select the game you wish to play"
                        id="game"
                      />
                    </div>
                    <div>
                      <label htmlFor="name">Your name (or nickname)</label>
                      <input
                        id="name"
                        placeholder="How you want to be called?"
                      />
                    </div>
                    <div>
                      <div>
                        <label htmlFor="expertise">
                          What's your expertise level?
                        </label>
                        <input id="expertise" placeholder="Choose a level..." />
                      </div>
                      <div>
                        <label htmlFor="discord">What's your discord?</label>
                        <input id="discord" placeholder="User#0000" />
                      </div>
                    </div>
                    <div>
                      <div>
                        <label htmlFor="daysPlaying">
                          When do you usually play?
                        </label>
                      </div>
                      <div>
                        <label htmlFor="hourStart">During which hours?</label>
                        <div>
                          <input
                            id="hourStart"
                            type="time"
                            placeholder="From"
                          />
                          <input id="hourEnd" type="time" placeholder="Until" />
                        </div>
                      </div>
                    </div>
                    <div>
                      <input type="checkbox" />I want to connect via Voice Chat
                    </div>
                  </div>

                  <footer>
                    <button>Cancel</button>
                    <button type="submit">
                      <img src={GameControllerIcon} alt="Game Controller" />
                      Find Duo
                    </button>
                  </footer>
                </form>
              </Dialog.Content>
            </Dialog.Content>
          </Dialog.Overlay>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}

export default App;
