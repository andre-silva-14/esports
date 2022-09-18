import { DetailInfo } from "./DetailInfo";

export function AdCard() {
  return (
    <div className="w-48 h-70 bg-[#2A2634]">
      <DetailInfo label="Name" text="Hello" />
      <DetailInfo label="Name" text="Hello" />
      <DetailInfo label="Name" text="Hello" />
      <DetailInfo label="Name" text="Hello" />
      <button>Details</button>
      <button>Connect</button>
    </div>
  );
}
