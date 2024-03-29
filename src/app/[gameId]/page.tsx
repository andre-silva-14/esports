"use client";
import * as Dialog from "@radix-ui/react-dialog";
import axios from "axios";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { ConnectModal } from "../../components/ConnectModal";
import { close } from "../../store/adSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

import { Ad } from "@prisma/client";
import { CaretLeft } from "phosphor-react";
import { AdCard } from "../../components/AdCard";
import { eSportsGame } from "../../types/eSportsGame";

type SimpleGame = Pick<eSportsGame, "title" | "bannerUrl">;

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const GamePage = () => {
  const dispatch = useAppDispatch();
  const [game, setGame] = useState<SimpleGame>();
  const adModalState = useAppSelector((state) => state.ads.open);
  const pathname = usePathname();
  const gameId = pathname?.split("/")[1];
  const {
    data: ads,
    error,
    isLoading,
  } = useSWR(`/api/games/${gameId}/ads`, fetcher);

  const fetchGame = async (id: string) => {
    const gameDetailsRequest = await fetch(`/api/games/${id}`, {
      cache: "force-cache",
    });
    const gameDetails = await gameDetailsRequest.json();

    setGame(gameDetails);
  };

  function handleModalState(state: boolean) {
    if (!state) {
      dispatch(close());
    }
  }

  useEffect(() => {
    if (gameId) {
      fetchGame(gameId as string);
    }
  }, [gameId]);
  return (
    <div className="m-10 sm:m-20">
      <div className="flex gap-6 items-center">
        <Link href="/" className="inline-block w-10">
          <CaretLeft size={40} color="#A1A1AA" />
        </Link>
        {game && (
          <h1 className="text-3xl text-white font-black">{game.title}</h1>
        )}
      </div>
      <div className="flex gap-6 mt-8 flex-wrap min-w-full">
        {!isLoading && ads.length > 0 ? (
          ads.map((ad: Ad) => <AdCard key={ad.id} data={ad} />)
        ) : (
          <>
            {isLoading ? (
              <h2 className="text-xl text-white text-center flex-1 mt-24">
                Loading...
              </h2>
            ) : (
              <h2 className="text-xl text-white text-center flex-1 mt-24">
                No Listings found.
              </h2>
            )}
          </>
        )}
      </div>
      <Dialog.Root open={adModalState} onOpenChange={handleModalState}>
        <ConnectModal />
      </Dialog.Root>
    </div>
  );
};

export default GamePage;
