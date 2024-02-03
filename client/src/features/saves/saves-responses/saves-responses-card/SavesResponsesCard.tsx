import { Button, buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { AdlibResponseModel } from "@/models/AdlibResponseModel";
import { MoreHorizontal } from "lucide-react";
import { Link } from "react-router-dom";

type Props = {
  response: AdlibResponseModel;
  deleteResponse: (response: AdlibResponseModel) => void;
};

const SavesResponsesCard = ({ response, deleteResponse }: Props) => {
  return (
    <Card className="flex flex-col gap-5 p-5">
      <div className="flex items-start">
        <div>
          <h4 className="text-xl font-semibold">{response.adlib.title}</h4>
          {response?.adlib?.categories ? (
            <ul className="flex gap-3 items-center">
              {response.adlib.categories.map((category) => (
                <li key={response.adlib.id + category.id}>
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
                onClick={() => deleteResponse(response)}
              >
                Delete
              </Button>
            </PopoverContent>
          </Popover>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <Link
          to={`/adlib/view/${response.id}`}
          className={`${buttonVariants({ variant: "default" })} w-32`}
        >
          Got to Response
        </Link>
        <Link
          to={`/adlib/${response.id}`}
          className={`${buttonVariants({ variant: "secondary" })} w-32`}
        >
          Go to adlib
        </Link>
      </div>
    </Card>
  );
};

export default SavesResponsesCard;
