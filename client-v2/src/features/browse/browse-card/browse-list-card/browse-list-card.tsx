import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import AdlibFeaturedCardCategory from "@/features/adlib/adlib-featured/adlib-featured-card/adlib-featured-card-category/adlib-featured-card-category";
import { Adlib } from "@/features/adlib/models/adlib.model";
import { cn } from "@/lib/utils";
import { formatDate } from "@/utils/formatDate";
import Link from "next/link";
import React from "react";

type BrowseListCard = {
  adlib: Adlib;
};

const BrowseListCard = ({ adlib }: BrowseListCard) => {
  return (
    <Card className="p-5">
      <header className="flex justify-between items-start gap-3">
        <div>
          <h4 className="font-semibold  line-clamp-1">{adlib.title}</h4>
          <p className="text-muted-foreground line-clamp-1 text-sm">
            Prompt:{adlib.prompt}
          </p>
        </div>
        <p className="text-muted-foreground text-sm">
          {formatDate(adlib.createdAt)}
        </p>
      </header>

      {adlib?.categories ? (
        <ul className="flex gap-0">
          {adlib.categories.map((category) => (
            <li key={category.id}>
              <AdlibFeaturedCardCategory category={category} />
            </li>
          ))}
        </ul>
      ) : null}
      <Link
        href={`/adlib/${adlib.id}`}
        className={cn(buttonVariants({ variant: "default" }), "mt-3")}
      >
        Go to Adlib
      </Link>
    </Card>
  );
};

export default BrowseListCard;
