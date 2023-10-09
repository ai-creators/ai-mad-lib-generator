import Card from "../../Card/Card";
import ProfileAdlibsFeed from "./ProfileAdlibsFeed/ProfileAdlibsFeed";

const ProfileAdlibs = () => {
  return (
    <Card useForSmall>
      <div className="flex flex-col gap-5">
        <div>
          <h4 className="text-2xl font-semibold capitalize">Your Ad-Libs</h4>
          <p className="text-zinc-400">Recently Created Ad-Libs</p>
        </div>
        <ProfileAdlibsFeed />
      </div>
    </Card>
  );
};

export default ProfileAdlibs;
