import { AccountModel } from "../../models/AccountModel";
import Card from "../card/Card";

type Props = {
  profile: AccountModel;
};

const ProfileCard = ({ profile }: Props) => {
  return (
    <Card className="" padding="p-0">
      <div className="bg-black h-12"></div>
    </Card>
  );
};

export default ProfileCard;
