export function GameBannerSkelton() {
  return (
    <div className="min-w-[204px] min-h-[272px] relative rounded-lg overflow-hidden blur-[1px] bg-violet-600/10">
      <div className="w-full pt-16 pb-4 px-4 bg-game-gradient-skelton absolute bottom-0 left-0 right-0">
        <div className="w-32 m-2 h-5 bg-violet-800/40"></div>
        <div className="w-20 m-2 h-3 bg-violet-900/30"></div>
      </div>
    </div>
  );
}
