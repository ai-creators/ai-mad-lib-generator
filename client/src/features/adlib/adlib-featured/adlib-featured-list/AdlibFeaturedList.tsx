import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AdlibModel } from "@/models/AdlibModel";
import dayjs from "dayjs";

type Props = {
  data: AdlibModel[];
};

const AdlibFeaturedList = ({ data }: Props) => {
  return (
    <ul className="flex flex-col gap-5">
      {data.map((adlib) => (
        <li key={adlib.id}>
          <Card className="p-5 flex flex-col gap-5">
            <div className="flex justify-between items-center gap-3">
              <h6 className="font-semibold truncate">{adlib.prompt}</h6>
              <p className="text-zinc-500 dark:text-zinc-400 text-sm whitespace-nowrap">
                {dayjs(adlib.createdAt).format("MMM, D")}
              </p>
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

export default AdlibFeaturedList;
