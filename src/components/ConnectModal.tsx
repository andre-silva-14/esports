import * as Dialog from "@radix-ui/react-dialog";
import Image from "next/image";
import { useAppSelector } from "../store/hooks";

import checkCircleIcon from "../assets/checkCircle.svg";
import closeIcon from "../assets/closeIcon.svg";

export function ConnectModal() {
  const discordId = useAppSelector((state) => state.ads.discordId);

  return (
    <Dialog.Portal>
      <Dialog.Overlay className="bg-black/60 inset-0 fixed">
        <Dialog.Content className="fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[560px] shadow-lg shadow-black/25">
          <Dialog.Close>
            <Image src={closeIcon} alt="Close Icon" />
          </Dialog.Close>
          <Image src={checkCircleIcon} alt="Check Circle Icon" />
          <Dialog.Title className="text-3xl font-black">
            Let&apos;s play!
          </Dialog.Title>
          <h3>Connect and start playing!</h3>
          <h3>Add on Discord</h3>
          <h4>{discordId}</h4>
        </Dialog.Content>
      </Dialog.Overlay>
    </Dialog.Portal>
  );
}
