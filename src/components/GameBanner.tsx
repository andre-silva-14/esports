export function GameBanner() {
  return (
    <a href="" className="relative rounded-lg overflow-hidden">
      <img src="/image1.png" alt="" />
      <div className="w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0 left-0 right-0">
        <strong className="font-bold text-white block">
          League of legends
        </strong>
        <span className="text-zinc-300 text-sm block mt-1">4 listings</span>
      </div>
    </a>
  );
}
