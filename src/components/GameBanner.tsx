import Image from "next/image";
import Link from "next/link";

export interface GameBannerProps {
  id: number;
  bannerUrl: string;
  title: string;
  adsCount: number;
}

export function GameBanner(props: GameBannerProps) {
  return (
    <Link
      href={`/${props.id}`}
      className="relative rounded-lg overflow-hidden [&:hover>div]:pb-6"
    >
      {props.bannerUrl && (
        <Image
          width={380}
          height={285}
          src={props.bannerUrl}
          alt={props.title}
        />
      )}
      <div className="w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0 left-0 right-0 transition-all duration-300">
        <strong className="font-bold text-white block">{props.title}</strong>
        <span className="text-zinc-300 text-sm block mt-1">
          {props.adsCount} listing(s)
        </span>
      </div>
    </Link>
  );
}
