import * as Select from "@radix-ui/react-select";
import { CaretDown, CaretUp, Check } from "phosphor-react";

interface SelectInputProps {
  label: string;
  title: string;
  placeholder: string;
  ariaLabel: string;
  data: {
    id: number | string;
    title: string;
  }[];
  onValueChange: any;
  value?: string;
}

export function SelectInput(props: SelectInputProps) {
  return (
    <>
      <label htmlFor={props.ariaLabel}>{props.label}</label>
      <Select.Root
        onValueChange={props.onValueChange}
        value={props.value || undefined}
      >
        <Select.SelectTrigger
          className=" bg-zinc-900 inline-flex items-center justify-between w-auto py-3 px-4 rounded text-sm data-placeholder:text-zinc-500"
          aria-label={props.ariaLabel}
        >
          <Select.SelectValue
            placeholder={props.placeholder}
          ></Select.SelectValue>
          <Select.SelectIcon>
            <CaretDown />
          </Select.SelectIcon>
        </Select.SelectTrigger>
        <Select.Portal>
          <Select.SelectContent className="overflow-hidden bg-zinc-900 rounded shadow-md">
            <Select.SelectScrollUpButton className="flex items-center justify-center h-6 text-slate-200">
              <CaretUp />
            </Select.SelectScrollUpButton>
            <Select.SelectViewport>
              <Select.SelectGroup>
                <Select.SelectLabel className="px-4 py-2 text-sm text-zinc-600">
                  {props.title}
                </Select.SelectLabel>
                {props.data.length > 0 ? (
                  props.data.map((game) => {
                    return (
                      <Select.SelectItem
                        key={game.id}
                        value={String(game.id)}
                        className="flex relative items-center px-6 py-1 select-none text-slate-200 data-highlighted:bg-violet-500"
                      >
                        <Select.SelectItemText>
                          {game.title}
                        </Select.SelectItemText>
                        <Select.SelectItemIndicator
                          id={props.ariaLabel}
                          className="absolute left-1.5 w-3 inline-flex items-center justify-center"
                        >
                          <Check />
                        </Select.SelectItemIndicator>
                      </Select.SelectItem>
                    );
                  })
                ) : (
                  <Select.SelectItem
                    key={0}
                    value="0"
                    className="flex relative items-center px-6 py-1 select-none pointer-events-none text-sm text-zinc-600"
                  >
                    <Select.SelectItemText>
                      No Items Found.
                    </Select.SelectItemText>
                  </Select.SelectItem>
                )}
              </Select.SelectGroup>
            </Select.SelectViewport>
            <Select.SelectScrollDownButton className="flex items-center justify-center h-6 text-slate-200">
              <CaretDown />
            </Select.SelectScrollDownButton>
          </Select.SelectContent>
        </Select.Portal>
      </Select.Root>
    </>
  );
}
