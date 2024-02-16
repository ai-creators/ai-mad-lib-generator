import { Card } from "@/components/ui/card";
import Feed from "@/components/feed/Feed";
import { useCategoryBrowse } from "./CategoryBrowse.hooks";
import CategoryBrowseNav from "./category-browse-nav/CategoryBrowseNav";
import { FeedTypes } from "@/models/FeedTypes";
import { CategoryModel } from "@/models/CategoryModel";
import CategoryList from "../category-list/CategoryList";

const CategoryBrowse = () => {
  const { feedType, changeFeedType, getCategories, search } =
    useCategoryBrowse();
  return (
    <Card className="p-5 flex flex-col gap-3">
      <div className="flex flex-col sm:flex-row justify-between items-start gap-3">
        <div>
          <h4 className="text-2xl font-semibold capitalize">
            {search ? search : feedType}...
          </h4>
          <p className="text-zinc-600 dark:text-zinc-400">
            {search ? `View ${search} adlibs` : `View the ${feedType} adlibs`}
          </p>
        </div>
        <CategoryBrowseNav
          changeFeedType={changeFeedType}
          feedType={feedType}
          feeds={[FeedTypes.POPULAR, FeedTypes.LATEST, FeedTypes.OLDEST]}
        />
      </div>
      <Feed<CategoryModel>
        feedType={feedType}
        ListComponent={CategoryList}
        executable={getCategories}
        endMessage={
          <p className="pt-5 px-0 font-semibold">
            No more categories available
          </p>
        }
      />
    </Card>
  );
};

export default CategoryBrowse;
