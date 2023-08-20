import { useState } from "react";
import Card from "../../components/Card/Card";
import Container from "../../components/Container/Container";
import storage from "../../utils/Storage";

const Settings = () => {
  const [contentRating, setContentRating] = useState(
    storage.get("content-rating") ?? "pg"
  );
  const changeRating = ({ target: { id } }) => {
    setContentRating(id);
    storage.set("content-rating", id);
  };

  return (
    <Container className="grid-aside py-12 gap-12">
      <Card useForSmall>
        <div>
          <h4 className="text-2xl font-semibold capitalize">
            Profile Settings
          </h4>
          <p className="text-zinc-400">Update your profile settings</p>
        </div>
      </Card>
      <Card useForSmall className="flex flex-col gap-5">
        <div>
          <h4 className="text-2xl font-semibold capitalize">Content Rating</h4>
          <p className="text-zinc-400">
            Choose the rating of your content being filtered
          </p>
        </div>
        <div className="flex flex-col gap-3">
          <p className="font-semibold">Content Rating</p>
          <ul className="flex items-center gap-3">
            <li>
              <button
                className={`py-2.5 w-24 ${
                  contentRating === "pg" ? "bg-zinc-900" : ""
                } hover:bg-zinc-900 active:bg-zinc-700 ease-out duration-200 rounded`}
                id="pg"
                onClick={changeRating}
              >
                PG
              </button>
            </li>
            <li>
              <button
                className={`py-2.5 w-24 ${
                  contentRating === "nsfw" ? "bg-zinc-900" : ""
                } hover:bg-zinc-900 active:bg-zinc-700 ease-out duration-200 rounded`}
                id="nsfw"
                onClick={changeRating}
              >
                NSFW
              </button>
            </li>
          </ul>
        </div>
      </Card>
    </Container>
  );
};

export default Settings;
