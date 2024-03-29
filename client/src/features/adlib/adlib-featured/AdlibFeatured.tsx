import Feed from "@/components/feed/Feed";
import { Card } from "@/components/ui/card";
import { useAdlibFeatured } from "./AdlibFeatured.hooks";
import AdlibList from "../adlib-list/AdlibList";

const AdlibFeatured = () => {
  const { getAdlibs } = useAdlibFeatured();
  return (
    <Card className="p-5 flex flex-col gap-3">
      <div>
        <h3 className="text-2xl font-semibold">Featured Adlibs</h3>
        <p className="text-zinc-600 dark:text-zinc-400">
          View our featured adlibs generated by our users.
        </p>
      </div>
      <Feed
        executable={getAdlibs}
        ListComponent={AdlibList}
        endMessage={
          <p className="pt-5 px-1 font-semibold">No more data available</p>
        }
      />
    </Card>
  );
};

export default AdlibFeatured;
