import { Card } from "@/components/ui/card";

const SavesResponses = () => {
  return (
    <Card className="p-5 flex flex-col gap-5">
      <div>
        <h2 className="text-2xl font-semibold">Saved Adlib Responses</h2>
        <p className="text-zinc-600 dark:text-zinc-400">
          View your saved adlib responses
        </p>
      </div>
    </Card>
  );
};

export default SavesResponses;
