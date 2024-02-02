import { Card } from "@/components/ui/card";
import { useSavesPrompts } from "./SavesPrompts.hooks";
import SavesPromptsCard from "./saves-prompts-card/SavesPromptsCard";

const SavesPrompts = () => {
  const { adlibs, deleteAdlib } = useSavesPrompts();
  return (
    <Card className="p-5 flex flex-col gap-5">
      <div>
        <h2 className="text-2xl font-semibold">Saved Adlib Prompts</h2>
        <p className="text-zinc-600 dark:text-zinc-400">
          View your saved adlibs
        </p>
      </div>
      <ul className="flex flex-col gap-5">
        {adlibs.length ? (
          adlibs.map((adlib) => (
            <li key={adlib.id}>
              <SavesPromptsCard adlib={adlib} deleteAdlib={deleteAdlib} />
            </li>
          ))
        ) : (
          <p>No Adlib Prompts Available</p>
        )}
      </ul>
    </Card>
  );
};

export default SavesPrompts;
