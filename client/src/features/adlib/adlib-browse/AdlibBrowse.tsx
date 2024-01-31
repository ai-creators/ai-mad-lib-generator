import { Card } from "@/components/ui/card";
import { useAdlibBrowse } from "./AdlibBrowse.hooks";
import AdlibBrowseNav from "./adlib-browse-nav/AdlibBrowseNav";

const AdlibBrowse = () => {
  const { feedType, changeFeedType } = useAdlibBrowse();
  return (
    <Card className="p-5 flex flex-col gap-3">
      <div className="flex justify-between items-start">
        <div>
          <h4 className="text-2xl font-semibold capitalize">{feedType}...</h4>
          <p className="text-zinc-600 dark:text-zinc-400">
            View the {feedType} adlibs
          </p>
        </div>
        <AdlibBrowseNav changeFeedType={changeFeedType} />
      </div>
    </Card>
  );
};

export default AdlibBrowse;
