import React from "react";
import { AdlibModel } from "../../../../models/AdlibModel";
import Card from "../../../card/Card";
import ButtonPrimary from "../../../button/button-primary/ButtonPrimary";
import ButtonLight from "../../../button/button-light/ButtonLight";
import dayjs from "dayjs";
import { Link } from "react-router-dom";

type Props = {
  adlib: AdlibModel;
};

const FeedListCard = ({ adlib }: Props) => {
  return (
    <Card className="flex flex-col gap-3">
      <div className="flex justify-between">
        <div>
          <h5 className="text-xl font-semibold capitalize">{adlib.title}</h5>
          <p className="text-zinc-500 text-sm">Prompt: {adlib.prompt}...</p>
          {adlib?.categories ? (
            <ul className="flex items-center gap-1 -ml-2">
              {adlib.categories.map((category) => (
                <li key={category.id}>
                  <ButtonLight
                    className="text-zinc-500 text-sm"
                    spacing="px-2 py-1.5"
                    href={`/adlib/categories/${category.name}`}
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
        <ButtonPrimary href={`/adlib/${adlib.id}`} className="block">
          Go to adlib
        </ButtonPrimary>
        <ButtonLight>Go to responses</ButtonLight>
      </div>
    </Card>
  );
};

export default FeedListCard;
