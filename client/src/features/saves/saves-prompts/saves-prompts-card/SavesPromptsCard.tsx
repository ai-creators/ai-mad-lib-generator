import { Button, buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AdlibModel } from "@/models/AdlibModel";
import dayjs from "dayjs";
import { MoreHorizontal } from "lucide-react";
import { Link } from "react-router-dom";

type Props = {
  adlib: AdlibModel;
};

const SavesPromptsCard = ({ adlib }: Props) => {
  return (
    <Card className="flex flex-col gap-5 p-5">
      <div className="flex items-start">
        <h4 className="text-xl font-semibold">{adlib.title}</h4>
        <div className="ml-auto flex items-start gap-2">
          <Button
            variant="ghost"
            className="px-2 py-0 flex justify-center items-center text-zinc-600 dark:text-zinc-400"
          >
            <MoreHorizontal size={24} />
          </Button>
        </div>
      </div>
      <div>
        <Link
          to={`adlib/${adlib.id}`}
          className={buttonVariants({ variant: "default" })}
        >
          Go to adlib
        </Link>
      </div>
    </Card>
  );
};

export default SavesPromptsCard;
