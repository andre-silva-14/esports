import { PostgrestResponse, SupabaseClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { supabase } from "../services/supabase";
import { getGame } from "../services/twitch";

import BackIcon from "../assets/CaretLeft.svg";
import { AdCard } from "../components/AdCard";
interface GameAd {
  test: number;
  game_id: number;
}

interface Game {
  name: string;
  bannerUrl: string;
}

const GamePage = (props: any) => {
  const params = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [game, setGame] = useState<Game>();

  const fetchGame = async () => {
    const gameDetails = await getGame(params.id!);

    setGame({
      name: gameDetails.name,
      bannerUrl: gameDetails.box_art_url,
    });
  };

  const fetchData = async (supabase: SupabaseClient) => {
    const { data: gameListings, error } = (await supabase
      .from("grouped_game_listings")
      .select("*")) as PostgrestResponse<GameAd>;
  };

  useEffect(() => {
    fetchData(supabase);

    if (!location.state) {
      fetchGame();
    } else {
      setGame({
        name: location.state.title,
        bannerUrl: location.state.bannerUrl,
      });
    }
  }, []);
  return (
    <div className="m-20">
      <div className="flex gap-6 items-center">
        <Link
          to={(() => (location.state ? (-1 as any) : "/"))()}
          className="inline-block w-10"
        >
          <img src={BackIcon} alt="Back Icon" />
        </Link>
        <h1 className="text-3xl text-white font-black m">{game?.name}</h1>
      </div>
      <div className="w-96 h-40 rounded-md overflow-hidden flex items-center mt-10">
        <img src={game?.bannerUrl} alt={game?.name} />
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
