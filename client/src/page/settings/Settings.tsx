import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Layout from "@/layout/Layout";
import Container from "@/layout/container/Container";
import NavbarSidebar from "@/layout/navbar/navbar-sidebar/NavbarSidebar";
import { ContentRating } from "@/models/ContentRating";
import storage from "@/utils/Storage";
import { useState } from "react";

const Settings = () => {
  const [contentRating, setContentRating] = useState<ContentRating>(
    storage.get("content-rating") ?? ContentRating.PG
  );
  const changeContentRating = (newRating: ContentRating) => {
    storage.set("content-rating", newRating);
    setContentRating(newRating);
  };
  return (
    <Layout>
      <div data-testid="home">
        <Container className="px-3 lg:px-0 py-5 grid-cols-12 grid gap-5">
          <aside className="hidden lg:flex flex-col gap-5 col-span-3">
            <Card className="p-2">
              <NavbarSidebar />
            </Card>
          </aside>
          <section className="col-span-12 lg:col-span-9 flex flex-col gap-5">
            <Card className="p-5">
              <h2 className="text-2xl font-semibold">Profile Settings</h2>
              <p className="text-zinc-600 dark:text-zinc-400">
                Update your profile settings
              </p>
            </Card>
            <Card className="p-5 flex flex-col gap-5">
              <div>
                <h2 className="text-2xl font-semibold">Content Rating</h2>
                <p className="text-zinc-600 dark:text-zinc-400">
                  Choose the rating of your content being filtered
                </p>
              </div>
              <form className="flex flex-col gap-3">
                <label className="font-semibold" htmlFor="content-rating">
                  Content Rating
                </label>
                <Tabs defaultValue={contentRating}>
                  <TabsList>
                    <TabsTrigger
                      value={ContentRating.PG}
                      onClick={() => changeContentRating(ContentRating.PG)}
                      className="w-16"
                    >
                      {ContentRating.PG}
                    </TabsTrigger>
                    <TabsTrigger
                      value={ContentRating.NSFW}
                      onClick={() => changeContentRating(ContentRating.NSFW)}
                      className="w-16"
                    >
                      {ContentRating.NSFW}
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </form>
            </Card>
          </section>
          {/* <aside className="col-span-3 "></aside> */}
        </Container>
      </div>
    </Layout>
  );
};

export default Settings;
