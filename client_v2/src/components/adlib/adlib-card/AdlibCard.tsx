import dayjs from "dayjs";
import { Link } from "react-router-dom";
import { AdlibModel } from "../../../models/AdlibModel";
import ButtonLight from "../../button/button-light/ButtonLight";
import ButtonPrimary from "../../button/button-primary/ButtonPrimary";
import Card from "../../card/Card";
import { HiddenButtonTypes } from "./AdlibHiddenButtonTypes";

type Props = {
  adlib: AdlibModel;
  hideButtons?: HiddenButtonTypes[];
};

const AdlibCard = ({ adlib, hideButtons = [] }: Props) => {
  return (
    <Card className="flex flex-col gap-5">
      <div className="flex justify-between">
        <div className="flex flex-col gap-1.5">
          <h5 className="text-xl font-semibold capitalize">{adlib.title}</h5>

          {adlib?.categories ? (
            <ul className="flex items-center gap-1 -ml-2">
              {adlib.categories.map((category) => (
                <li key={category.id}>
                  <ButtonLight
                    className="text-zinc-500 text-sm"
                    spacing="px-2 py-1.5"
                    href={`/adlib/category/${category.name}`}
                  >
                    #{category.name}
                  </ButtonLight>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
        <div className="flex flex-col items-end">
          {adlib?.createdBy ? (
            <Link
              to={`/profile/${adlib.createdBy.id}`}
              className="text-sm font-semibold capitalize hover:underline underline-offset-2 active:underline hover:text-indigo-800 active:text-indigo-800"
            >
              {adlib.createdBy.username}
            </Link>
          ) : null}
          <p className="text-zinc-500 text-sm">
            {dayjs(adlib.createdAt).format("MMM, D")}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {hideButtons.includes(HiddenButtonTypes.ADLIB) ? null : (
          <ButtonPrimary href={`/adlib/${adlib.id}`} className="block">
            Go to adlib
          </ButtonPrimary>
        )}
        {hideButtons.includes(HiddenButtonTypes.RESPONSE) ? null : (
          <ButtonLight href={`/adlib/${adlib.id}/responses`}>
            Go to responses
          </ButtonLight>
        )}
      </div>
    </Card>
  );
};

export default AdlibCard;
