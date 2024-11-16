import React from "react";
import { Adlib } from "../../models/adlib.model";
import { Card } from "@/components/ui/card";

type AdlibFeaturedCardProps = {
  adlib: Adlib;
};
const AdlibFeaturedCard = ({ adlib }: AdlibFeaturedCardProps) => {
  return (
    <Card className="p-5">
      <h4>{adlib.title}</h4>
      <p>Prompt:{adlib.prompt}</p>
    </Card>
  );
};

export default AdlibFeaturedCard;
