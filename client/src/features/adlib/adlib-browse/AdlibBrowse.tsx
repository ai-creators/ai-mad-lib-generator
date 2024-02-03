import { Card } from "@/components/ui/card";
import { useAdlibBrowse } from "./AdlibBrowse.hooks";
import AdlibBrowseNav from "./adlib-browse-nav/AdlibBrowseNav";
import Feed from "@/components/feed/Feed";
import AdlibList from "../adlib-list/AdlibList";

const AdlibBrowse = () => {
  const { feedType, changeFeedType, getAdlibs, search } = useAdlibBrowse();
  return (
    <Card className="p-5 flex flex-col gap-3">
      <div className="flex justify-between items-start">
        <div>
          <h4 className="text-2xl font-semibold capitalize">
            {search ? search : feedType}...
          </h4>
          <p className="text-zinc-600 dark:text-zinc-400">
            {search ? `View ${search} adlibs` : `View the ${feedType} adlibs`}
          </p>
        </div>
        <AdlibBrowseNav changeFeedType={changeFeedType} feedType={feedType} />
      </div>
      <Feed
        feedType={feedType}
        ListComponent={AdlibList}
        executable={getAdlibs}
        endMessage={
          <p className="pt-5 px-0 font-semibold">No more adlibs available</p>
        }
      />
    </Card>
  );
};

export default AdlibBrowse;
