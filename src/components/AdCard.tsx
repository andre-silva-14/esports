import type { Ad } from "@prisma/client";
import { GameController } from "phosphor-react";
import { open } from "../store/adSlice";
import { useAppDispatch } from "../store/hooks";
import expertiseLevels from "../utils/expertiseLevels";
import { DetailInfo } from "./DetailInfo";

interface AdCardProps {
  data: Ad;
}

export function AdCard({ data }: AdCardProps) {
  const dispatch = useAppDispatch();
  const expertise = expertiseLevels.filter(
    (exp) => exp.id === data.expertise
  )[0].title;

  function buildAvailabilityString(
    weekDays: string | null,
    hourStart: string | null,
    hourEnd: string | null
  ) {
    if (weekDays && hourStart && hourEnd) {
      const dayCount = data.weekDays?.split(",").length || 0;
      const hourRange = `${hourStart}h - ${hourEnd}h`;

      return `${dayCount} days • ${hourRange}`;
    } else if (weekDays) {
      const dayCount = data.weekDays?.split(",").length || 0;
      return `${dayCount} days`;
    } else {
      return `Unknown`;
    }
  }
  const availability = buildAvailabilityString(
    data.weekDays,
    data.hourStart,
    data.hourEnd
  );

  const wantsVoiceChat = data.useVoiceChannel ? "Yes" : "No";

  function openConnectModal() {
    dispatch(open(data.discord));
  }

  return (
    <div className="w-48 h-70 bg-[#2A2634] shadow-sm p-4 rounded-lg flex flex-col gap-2">
      <DetailInfo label="Nickname" text={data.name} />
      <DetailInfo label="Expertise" text={expertise} />
      <DetailInfo label="Availability" text={availability} />
      <DetailInfo label="Voice Chat" text={wantsVoiceChat} />
      <button
        onClick={openConnectModal}
        className="py-2 bg-violet-500 text-sm text-white rounded-lg flex justify-center gap-2 transition-colors hover:bg-violet-600"
      >
        <GameController size={22}></GameController>
        Connect
      </button>
    </div>
  );
}
