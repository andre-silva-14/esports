import * as Checkbox from "@radix-ui/react-checkbox";
import * as Dialog from "@radix-ui/react-dialog";

import * as ToggleGroup from "@radix-ui/react-toggle-group";
import axios from "axios";
import { Check, GameController } from "phosphor-react";
import { FormEvent, useState } from "react";
import expertiseLevels from "../../utils/expertiseLevels";
import { Input } from "./Input";
import { SelectInput } from "./SelectInput";

import { ZodError } from "zod";
import { AdSchema } from "../../schemas/adSchema";

import { eSportsGame } from "../../types/eSportsGame";

type SimpleGame = Pick<eSportsGame, "id" | "title">;

interface CreateAdModalProps {
  games: SimpleGame[];
  setToastState(state: boolean): void;
  setFormState(state: boolean): void;
}

export function CreateAdModal(props: CreateAdModalProps) {
  const [selectedGame, setSelectedGame] = useState<string>("");
  const [expertise, setExpertise] = useState<string>("");
  const [weekDays, setWeekDays] = useState<string[]>([]);
  const [useVoiceChannel, setUseVoiceChannel] = useState<boolean>(false);
  const [formHasError, setFormHasError] = useState<boolean>(false);
  const [errorElement, setErrorElement] = useState<string>("");

  const resetFormSubmission = (fullReset: boolean = false) => {
    setFormHasError(false);
    setErrorElement("");

    if (fullReset) {
      setSelectedGame("");
      setExpertise("");
      setWeekDays([]);
      setUseVoiceChannel(false);
    }
  };

  const handleFormUpdate = () => {
    resetFormSubmission();
  };

  const handleCreateListing = async (e: FormEvent) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);

    const data = Object.fromEntries(formData);

    try {
      const parsedAd = AdSchema.parse({
        gameId: selectedGame ? BigInt(selectedGame) : undefined,
        name: data.name,
        expertise: expertise,
        discord: data.discord,
        weekDays: weekDays.map(Number).join(","),
        hourStart: data.hourStart,
        hourEnd: data.hourEnd,
        useVoiceChannel: useVoiceChannel,
      });

      const { gameId, ...adData } = parsedAd;
      await axios.post(`/api/games/${gameId}/ads`, adData);
    } catch (err) {
      if (err instanceof ZodError) {
        setFormHasError(true);
        setErrorElement(err.issues[0].path[0] as string);
      }

      console.error(err);
      return;
    }

    props.setFormState(false);
    resetFormSubmission(true);
    props.setToastState(true);
  };

  return (
    <Dialog.Portal>
      <Dialog.Overlay className="bg-black/60 inset-0 fixed">
        <Dialog.Content className="fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[98%] sm:w-[560px] shadow-lg shadow-black/25">
          <Dialog.Title className="text-3xl font-black">
            Publish a listing
          </Dialog.Title>
          <form
            onSubmit={handleCreateListing}
            onChange={handleFormUpdate}
            className="mt-8 flex flex-col gap-4"
          >
            <div className="flex flex-col gap-2">
              <SelectInput
                className={
                  formHasError && errorElement === "gameId"
                    ? "border border-rose-500"
                    : ""
                }
                label="Game"
                title="Available Games"
                placeholder="Select a game..."
                ariaLabel="game"
                data={props.games}
                value={selectedGame}
                onValueChange={setSelectedGame}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="name">Nickname</label>
              <Input
                id="name"
                name="name"
                placeholder="How you want to be called?"
                className={
                  formHasError && errorElement === "name"
                    ? "border border-rose-500"
                    : ""
                }
              />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <SelectInput
                  label="Expertise"
                  title="Expertise Level"
                  placeholder="Choose a level..."
                  ariaLabel="expertise"
                  data={expertiseLevels}
                  value={expertise}
                  onValueChange={setExpertise}
                  className={
                    formHasError && errorElement === "expertise"
                      ? "border border-rose-500"
                      : ""
                  }
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="discord">Discord</label>
                <Input
                  id="discord"
                  name="discord"
                  placeholder="User#0000"
                  className={
                    formHasError && errorElement === "discord"
                      ? "border border-rose-500"
                      : ""
                  }
                />
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
                <label htmlFor="hourStart">Hours Schedule</label>
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
              <Dialog.Close
                className="bg-zinc-500 px-5 h-12 rounded-md font-semibold transition-colors hover:bg-zinc-600"
                onClick={() => resetFormSubmission(true)}
              >
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
