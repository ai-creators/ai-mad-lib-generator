import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const AdlibCreateCard = () => {
  return (
    <Card className="p-5">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-semibold">Generate an Adlib</h2>
        <form className="flex flex-col gap-3">
          <Label htmlFor="adlib" className="text-zinc-600 dark:text-zinc-400">
            Enter a prompt to generate an adlib
          </Label>
          <Input
            type="text"
            id="adlib"
            placeholder="The Rock fighting Kevin Hart..."
          />
        </form>
      </div>
    </Card>
  );
};

export default AdlibCreateCard;
