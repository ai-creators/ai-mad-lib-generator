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
  console.log(adlib);
  return (
    <Card className="flex flex-col gap-5">
      <div className="flex justify-between">
        <div>
          <h5 className="text-xl font-semibold">{adlib.title}</h5>
          <p className="text-zinc-500 text-sm">Prompt: {adlib.prompt}...</p>
        </div>
        <div>
          <p className="text-zinc-500 text-sm font-semibold">
            {dayjs(adlib.createdAt).format("MMM, D")}
          </p>
          {adlib?.createdBy ? (
            <Link
              to={`/profile/${adlib.createdBy.id}`}
              className="text-sm font-semibold"
            >
              {adlib.createdBy.username}
            </Link>
          ) : null}
        </div>
      </div>
      <div className="flex items-center gap-3">
        <ButtonPrimary href={`/adlib/play/${adlib.id}`} className="block">
          Go to adlib
        </ButtonPrimary>
        <ButtonLight>Go to responses</ButtonLight>
      </div>
    </Card>
  );
};

export default FeedListCard;
