import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AdlibModel } from "@/models/AdlibModel";
import dayjs from "dayjs";

type Props = {
  data: AdlibModel[];
};

const AdlibList = ({ data }: Props) => {
  return (
    <ul className="flex flex-col gap-5">
      {data.map((adlib) => (
        <li key={adlib.id}>
          <Card className="p-5 flex flex-col gap-5">
            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-center gap-3">
                <div>
                  <h6 className="font-semibold truncate">{adlib.title}</h6>
                  <p className="text-zinc-600 dark:text-zinc-400 truncate text-sm">
                    Prompt: {adlib.prompt}
                  </p>
                </div>

                <p className="text-zinc-500 dark:text-zinc-400 text-sm whitespace-nowrap">
                  {dayjs(adlib.createdAt).format("MMM, D")}
                </p>
              </div>
              {adlib?.categories ? (
                <ul className="flex gap-3 items-center ">
                  {adlib.categories.map((category) => (
                    <li key={`${adlib.id}-${category.id}`}>
                      <Badge>{category.name}</Badge>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>

            <div>
              <Button>Go to adlib</Button>
            </div>
          </Card>
        </li>
      ))}
    </ul>
  );
};

export default AdlibList;
