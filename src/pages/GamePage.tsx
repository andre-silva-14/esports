import { PostgrestResponse, SupabaseClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../services/supabase";
import { getGame } from "../services/twitch";

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
  const [game, setGame] = useState<Game>();

  useEffect(() => {
    const fetchData = async (supabase: SupabaseClient) => {
      const gameDetails = await getGame(params.id!);

      const { data: gameListings, error } = (await supabase
        .from("grouped_game_listings")
        .select("*")) as PostgrestResponse<GameAd>;

      setGame({
        name: gameDetails.name,
        bannerUrl: gameDetails.box_art_url,
      });

      console.log(gameDetails);
    };

    fetchData(supabase);
  }, []);
  return <h1>Hello World {game?.name} </h1>;
};

export default GamePage;
