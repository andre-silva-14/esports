interface DetailInfoProps {
  label: string;
  text: string;
}

export function DetailInfo(props: DetailInfoProps) {
  return (
    <div>
      <p>{props.label}</p>
      <p>{props.text}</p>
    </div>
  );
}
