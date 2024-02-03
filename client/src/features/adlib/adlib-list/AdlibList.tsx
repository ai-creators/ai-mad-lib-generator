import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AdlibModel } from "@/models/AdlibModel";
import dayjs from "dayjs";
import { Link } from "react-router-dom";

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
                  <h6 className="font-semibold  line-clamp-1">{adlib.title}</h6>
                  <p className="text-zinc-600 dark:text-zinc-400  line-clamp-1 text-sm">
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
                      <p className="text-zinc-600 dark:text-zinc-400">
                        #{category.name}
                      </p>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>

            <div>
              <Link
                to={`/adlib/${adlib.id}`}
                className={buttonVariants({ variant: "default" })}
              >
                Go to adlib
              </Link>
            </div>
          </Card>
        </li>
      ))}
    </ul>
  );
};

export default AdlibList;
