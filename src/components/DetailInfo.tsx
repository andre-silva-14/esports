interface DetailInfoProps {
  label: string;
  text: string;
}

export function DetailInfo(props: DetailInfoProps) {
  return (
    <div>
      <p className="text-sm text-zinc-400">{props.label}</p>
      <p className="text-sm font-bold text-white">{props.text}</p>
    </div>
  );
}
