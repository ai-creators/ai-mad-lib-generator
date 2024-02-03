import { Button, buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { AdlibModel } from "@/models/AdlibModel";
import { MoreHorizontal } from "lucide-react";
import { Link } from "react-router-dom";

type Props = {
  adlib: AdlibModel;
  deleteAdlib: (adlib: AdlibModel) => void;
};

const SavesPromptsCard = ({ adlib, deleteAdlib }: Props) => {
  return (
    <Card className="flex flex-col gap-5 p-5">
      <div className="flex items-start">
        <div>
          <h4 className="text-xl font-semibold">{adlib.title}</h4>
          {adlib?.categories ? (
            <ul className="flex gap-3 items-center">
              {adlib.categories.map((category) => (
                <li key={adlib.id + category.id}>
                  <p className="text-zinc-600 dark:text-zinc-400">
                    #{category.name}
                  </p>
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        <div className="ml-auto flex items-start gap-2">
          <Popover>
            <PopoverTrigger>
              <MoreHorizontal
                size={24}
                className="text-zinc-600 dark:text-zinc-400"
              />
            </PopoverTrigger>
            <PopoverContent className="w-[10rem] p-1">
              <Button
                variant={"ghost"}
                className="flex justify-start w-full"
                onClick={() => deleteAdlib(adlib)}
              >
                Delete
              </Button>
            </PopoverContent>
          </Popover>
        </div>
      </div>
      <div>
        <Link
          to={`adlib/${adlib.id}`}
          className={`${buttonVariants({ variant: "default" })} w-32`}
        >
          Go to adlib
        </Link>
      </div>
    </Card>
  );
};

export default SavesPromptsCard;
