"use client";
import axios from "axios";
import Image from "next/image";
import useSWR from "swr";

import { GameBanner } from "../components/GameBanner";

import * as Dialog from "@radix-ui/react-dialog";

import logoImg from "../assets/logo.svg";
import { CreateAdBanner } from "../components/CreateAdBanner";
import { CreateAdModal } from "../components/Form/CreateAdModal";
import { GameBannerSkelton } from "../components/GameBannerSkelton";

import { useState } from "react";
import { SuccessToast } from "../components/SuccessToast";
import { eSportsGame } from "../types/eSportsGame";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export default function Home() {
  const { data: games, error, isLoading } = useSWR("/api/games/top", fetcher);
  const [toastIsOpen, setToastIsOpen] = useState(false);
  const [formIsOpen, setFormIsOpen] = useState<boolean>(false);

  return (
    <div className="max-w-[1344px] mx-auto flex flex-col items-center mt-20">
      <Image src={logoImg} alt="esports" />
      <h1 className="text-6xl text-white font-black mt-20 px-10">
        Your{" "}
        <span className="bg-duo-gradient bg-clip-text text-transparent">
          duo
        </span>{" "}
        is here.
      </h1>
      <div className="mx-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 mt-16">
        {isLoading
          ? [...Array(6)].map((_, i) => <GameBannerSkelton key={i} />)
          : games.slice(0, 6).map((game: eSportsGame) => {
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

      <Dialog.Root open={formIsOpen} onOpenChange={setFormIsOpen}>
        <CreateAdBanner isLoading={isLoading} />
        <CreateAdModal
          games={games}
          setToastState={setToastIsOpen}
          setFormState={setFormIsOpen}
        />
      </Dialog.Root>
      <SuccessToast
        title="Success"
        description="Listing was added successfully!"
        status={toastIsOpen}
        setStatus={setToastIsOpen}
      />
    </div>
  );
}
