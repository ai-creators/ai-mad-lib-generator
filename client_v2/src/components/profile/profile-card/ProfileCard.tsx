import { Link } from "react-router-dom";
import { AccountModel } from "../../../models/AccountModel";
import Avatar from "../../avatar/Avatar";
import Card from "../../card/Card";
import ButtonPrimary from "../../button/button-primary/ButtonPrimary";
import { useAppSelector } from "../../../hooks/useAppSelector";

type Props = {
  profile: AccountModel;
};

const ProfileCard = ({ profile }: Props) => {
  const { account } = useAppSelector((state) => state.account);
  return (
    <Card className="relative overflow-hidden" padding="p-0">
      <div className="bg-black h-10"></div>
      <div className="p-3 flex flex-col gap-5">
        <Link
          to={`/profile/${profile.username}`}
          className="absolute top-5 border-4 border-black rounded-full left-4"
        >
          <Avatar width="w-8" height="h-8" />
        </Link>
        <Link
          to={`/profile/${profile.username}`}
          className="mt-3 ml-1 hover:underline underline-offset-2 active:underline hover:text-indigo-800 active:text-indigo-900"
        >
          <h6 className="font-semibold ">{profile.username}</h6>
        </Link>

        {account?.id !== profile.id ? (
          <ButtonPrimary className="block w-full">Follow</ButtonPrimary>
        ) : (
          <ButtonPrimary
            className="block w-full text-center"
            href={`/profile/${account?.username}`}
          >
            Edit Account
          </ButtonPrimary>
        )}
      </div>
    </Card>
  );
};

export default ProfileCard;
