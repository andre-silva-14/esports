import * as Dialog from "@radix-ui/react-dialog";
import searchIcon from "../assets/MagnifyingGlassPlus.svg";

export function CreateAdBanner() {
  return (
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
        <Dialog.Trigger className="py-3 px-4 bg-violet-500 text-white rounded flex gap-3 transition-colors hover:bg-violet-600">
          <img src={searchIcon} alt="Magnifying Glass Icon" />
          Publish Listing
        </Dialog.Trigger>
      </div>
    </div>
  );
}
