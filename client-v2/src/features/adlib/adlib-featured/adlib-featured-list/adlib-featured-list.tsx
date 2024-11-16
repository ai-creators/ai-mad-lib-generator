import React from "react";
import { Adlib } from "../../models/adlib.model";
import AdlibFeaturedCard from "../adlib-featured-card/adlib-featured-card";

type AdlibFeaturedListProps = {
  adlibs: Adlib[];
};

const AdlibFeaturedList = ({ adlibs }: AdlibFeaturedListProps) => {
  if (!adlibs.length) {
    return <p>No Adlibs available</p>;
  }
  return (
    <ul className="flex flex-col gap-5 px-5">
      {adlibs.map((adlib) => (
        <li key={adlib.id}>
          <AdlibFeaturedCard adlib={adlib} />
        </li>
      ))}
    </ul>
  );
};

export default AdlibFeaturedList;
