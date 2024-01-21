import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AdlibModel } from "@/models/AdlibModel";
import dayjs from "dayjs";

type Props = {
  data: AdlibModel[];
};

const AdlibFeaturedList = ({ data }: Props) => {
  return (
    <ul>
      {data.map((adlib) => (
        <li key={adlib.id}>
          <Card className="p-5">
            <div>
              <h6>{adlib.prompt}</h6>
              <p className="text-zinc-500 dark:text-zinc-300">
                {dayjs(adlib.createdAt).format("MMM, D")}
              </p>
            </div>

            <Button>Go to adlib</Button>
          </Card>
        </li>
      ))}
    </ul>
  );
};

export default AdlibFeaturedList;
