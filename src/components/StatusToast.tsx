import * as Toast from "@radix-ui/react-toast";
import { Dispatch, SetStateAction } from "react";

interface SuccessToastProps {
  title: string;
  description: string;
  status: boolean;
  setStatus: Dispatch<SetStateAction<boolean>>;
  backgroundColor?: string;
  duration?: number;
}

export function StatusToast(props: SuccessToastProps) {
  const { backgroundColor = "bg-green-700", duration = 3000 } = props;

  return (
    <Toast.Provider swipeDirection="right" duration={duration}>
      <Toast.Root
        className={`${backgroundColor} rounded-md shadow p-4 grid grid-cols-toast grid-rows-2 gap-x-4 items-center`}
        open={props.status}
        onOpenChange={props.setStatus}
      >
        <Toast.Title className="col-span-1 text-gray-100 mb-1 font-medium text-base">
          {props.title}
        </Toast.Title>
        <Toast.Description className="col-span-2 text-gray-300 m-0 text-sm">
          {props.description}
        </Toast.Description>
      </Toast.Root>
      <Toast.Viewport className="fixed bottom-0 right-0 flex flex-col p-6 gap-2 w-96 max-w-[100vw] m-0 list-none z-[2147483647] outline-none" />
    </Toast.Provider>
  );
}
