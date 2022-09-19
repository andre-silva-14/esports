import * as Checkbox from "@radix-ui/react-checkbox";
import * as Dialog from "@radix-ui/react-dialog";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import axios from "axios";
import { Check, GameController } from "phosphor-react";
import { FormEvent, useState } from "react";
import { Input } from "./Input";

interface SimpleGame {
  id: number;
  title: string;
}

interface CreateAdModalProps {
  games: SimpleGame[];
}

export function CreateAdModal(props: CreateAdModalProps) {
  const [weekDays, setWeekDays] = useState<string[]>([]);
  const [useVoiceChannel, setUseVoiceChannel] = useState<boolean>(false);

  const handleCreateListing = async (e: FormEvent) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);

    const data = Object.fromEntries(formData);

    try {
      await axios.post(`http://localhost:3333/games/${data.game}/ads`, {
        name: data.name,
        expertise: data.expertise,
        discord: data.discord,
        weekDays: weekDays.map(Number),
        hourStart: data.hourStart,
        hourEnd: data.hourEnd,
        useVoiceChannel: useVoiceChannel,
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Dialog.Portal>
      <Dialog.Overlay className="bg-black/60 inset-0 fixed">
        <Dialog.Content className="fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[560px] shadow-lg shadow-black/25">
          <Dialog.Title className="text-3xl font-black">
            Publish a listing
          </Dialog.Title>
          <form
            onSubmit={handleCreateListing}
            className="mt-8 flex flex-col gap-4"
          >
            <div className="flex flex-col gap-2">
              <label htmlFor="game">Which game?</label>
              <select
                className="bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500 appearance-none"
                id="game"
                name="game"
                defaultValue={0}
              >
                <option value={0} disabled hidden>
                  Select the game you wish to play
                </option>
                {props.games.map((game) => {
                  return (
                    <option key={game.id} value={game.id}>
                      {game.title}
                    </option>
                  );
                })}
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="name">Your name (or nickname)</label>
              <Input
                id="name"
                name="name"
                placeholder="How you want to be called?"
              />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label htmlFor="expertise">What's your expertise level?</label>
                <Input
                  id="expertise"
                  name="expertise"
                  placeholder="Choose a level..."
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="discord">What's your discord?</label>
                <Input id="discord" name="discord" placeholder="User#0000" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label htmlFor="daysPlaying">Daily Schedule</label>
                <ToggleGroup.Root
                  type="multiple"
                  className="grid grid-cols-5 gap-1"
                  onValueChange={setWeekDays}
                  value={weekDays}
                >
                  <ToggleGroup.Item
                    value="0"
                    title="Monday"
                    className={`h-9 rounded ${
                      weekDays.includes("0") ? "bg-violet-500" : "bg-zinc-900"
                    }`}
                  >
                    M
                  </ToggleGroup.Item>
                  <ToggleGroup.Item
                    value="1"
                    title="Tuesday"
                    className={`h-9 rounded ${
                      weekDays.includes("1") ? "bg-violet-500" : "bg-zinc-900"
                    }`}
                  >
                    T
                  </ToggleGroup.Item>
                  <ToggleGroup.Item
                    value="2"
                    title="Wednesday"
                    className={`h-9 rounded ${
                      weekDays.includes("2") ? "bg-violet-500" : "bg-zinc-900"
                    }`}
                  >
                    W
                  </ToggleGroup.Item>
                  <ToggleGroup.Item
                    value="3"
                    title="Thursday"
                    className={`h-9 rounded ${
                      weekDays.includes("3") ? "bg-violet-500" : "bg-zinc-900"
                    }`}
                  >
                    T
                  </ToggleGroup.Item>
                  <ToggleGroup.Item
                    value="4"
                    title="Friday"
                    className={`h-9 rounded ${
                      weekDays.includes("4") ? "bg-violet-500" : "bg-zinc-900"
                    }`}
                  >
                    F
                  </ToggleGroup.Item>
                  <ToggleGroup.Item
                    value="5"
                    title="Weekend"
                    className={`h-9 rounded col-span-5 ${
                      weekDays.includes("5") ? "bg-violet-500" : "bg-zinc-900"
                    }`}
                  >
                    Weekend
                  </ToggleGroup.Item>
                </ToggleGroup.Root>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="hourStart">During which hours?</label>
                <div className="grid grid-cols-2 gap-2">
                  <Input
                    id="hourStart"
                    name="hourStart"
                    type="time"
                    placeholder="From"
                  />
                  <Input
                    id="hourEnd"
                    name="hourEnd"
                    type="time"
                    placeholder="Until"
                  />
                </div>
              </div>
            </div>

            <label className="mt-1 flex items-center gap-2 text-sm">
              <Checkbox.Root
                onCheckedChange={(checked) => {
                  if (checked === true) {
                    setUseVoiceChannel(true);
                  } else {
                    setUseVoiceChannel(false);
                  }
                }}
                checked={useVoiceChannel}
                className="w-6 h-6 p-1 rounded bg-zinc-900"
              >
                <Checkbox.Indicator>
                  <Check className="w-4 h-4 text-emerald-400" />
                </Checkbox.Indicator>
              </Checkbox.Root>
              I want to connect via Voice Chat
            </label>

            <footer className="mt-4 flex justify-end gap-4">
              <Dialog.Close className="bg-zinc-500 px-5 h-12 rounded-md font-semibold transition-colors hover:bg-zinc-600">
                Cancel
              </Dialog.Close>
              <button
                type="submit"
                className="bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 transition-colors hover:bg-violet-600"
              >
                <GameController size={24}></GameController>
                Find Duo
              </button>
            </footer>
          </form>
        </Dialog.Content>
      </Dialog.Overlay>
    </Dialog.Portal>
  );
}
