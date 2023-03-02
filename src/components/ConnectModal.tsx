import * as Dialog from "@radix-ui/react-dialog";
import Image from "next/image";
import { useAppSelector } from "../store/hooks";

import { useState } from "react";
import checkCircleIcon from "../assets/checkCircle.svg";
import closeIcon from "../assets/closeIcon.svg";

export function ConnectModal() {
  const discordId = useAppSelector((state) => state.ads.discordId);
  const [hasCopied, setHasCopied] = useState(false);

  function handleCopyToClipboard() {
    navigator.clipboard.writeText(discordId!);
    setHasCopied(true);
    setTimeout(() => {
      setHasCopied(false);
    }, 2000);
  }

  return (
    <Dialog.Portal>
      <Dialog.Overlay className="bg-black/60 inset-0 fixed">
        <Dialog.Content className="fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[90%] sm:w-[560px] shadow-lg shadow-black/25 flex flex-col items-center">
          <Dialog.Close className="absolute top-4 right-4">
            <Image src={closeIcon} alt="Close Icon" />
          </Dialog.Close>
          <Image src={checkCircleIcon} alt="Check Circle Icon" />
          <Dialog.Title className="mt-6 text-3xl font-black">
            Let&apos;s play!
          </Dialog.Title>
          <h3 className="text-zinc-400">Connect and start playing!</h3>
          <h3 className="mt-6">Add on Discord</h3>
          <h4
            onClick={handleCopyToClipboard}
            className="mt-2 bg-zinc-900 text-zinc-300 rounded py-3 min-w-[50%] text-center cursor-pointer"
          >
            {hasCopied ? "Copied!" : discordId}
          </h4>
        </Dialog.Content>
      </Dialog.Overlay>
    </Dialog.Portal>
  );
}
