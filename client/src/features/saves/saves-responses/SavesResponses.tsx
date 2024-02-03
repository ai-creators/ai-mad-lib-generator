import { Card } from "@/components/ui/card";
import SavesResponsesCard from "./saves-responses-card/SavesResponsesCard";
import { useSavesResponses } from "./SavesResponses.hooks";

const SavesResponses = () => {
  const { responses, deleteResponse } = useSavesResponses();
  return (
    <Card className="p-5 flex flex-col gap-5">
      <div>
        <h2 className="text-2xl font-semibold">Saved Adlib Responses</h2>
        <p className="text-zinc-600 dark:text-zinc-400">
          View your saved adlib responses
        </p>
      </div>
      <ul className="flex flex-col gap-5">
        {responses.length ? (
          responses.map((response) => (
            <li key={response.id}>
              <SavesResponsesCard
                response={response}
                deleteResponse={deleteResponse}
              />
            </li>
          ))
        ) : (
          <p className="font-semibold">No Adlib Responses Available</p>
        )}
      </ul>
    </Card>
  );
};

export default SavesResponses;
