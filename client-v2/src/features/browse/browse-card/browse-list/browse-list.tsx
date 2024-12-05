import { Adlib } from "@/features/adlib/models/adlib.model";
import React from "react";
import BrowseListCard from "../browse-list-card/browse-list-card";

type BrowseListProps = {
  adlibs: Adlib[];
};

const BrowseList = ({ adlibs }: BrowseListProps) => {
  if (!adlibs.length) {
    return <p className="px-5 font-semibold">No adlibs available</p>;
  }

  return (
    <ul className="flex flex-col gap-5 px-5">
      {adlibs.map((adlib) => (
        <li key={adlib.id}>
          <BrowseListCard adlib={adlib} />
        </li>
      ))}
    </ul>
  );
};

export default BrowseList;
