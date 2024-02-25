import { Button } from "@/components/ui/button";
import { useMultiplayerLobbyCode } from "./MultiplayerLobbyCode.hooks";
import { Clipboard, Eye, EyeOff } from "lucide-react";

type Props = {
  code: string;
};

const MultiplayerLobbyCode = ({ code }: Props) => {
  const { isVisible, toggleVisibility, copyCode } =
    useMultiplayerLobbyCode(code);
  return (
    <div className="flex flex-col gap-2">
      <p className="text-stone-600 dark:text-stone-400 font-semibold text-sm">
        Lobby Code
      </p>
      <div className="flex gap-2 items-center">
        <Button
          onClick={copyCode}
          variant="secondary"
          disabled={!isVisible}
          className="w-28"
        >
          {isVisible ? (
            <>
              {code} <Clipboard className="ml-2" size={18} />
            </>
          ) : (
            <p className="font-semibold">Code Hidden</p>
          )}
        </Button>
        <Button variant="ghost" onClick={toggleVisibility} className="px-2 h-8">
          {isVisible ? <Eye size={18} /> : <EyeOff size={18} />}
        </Button>
      </div>
    </div>
  );
};

export default MultiplayerLobbyCode;
