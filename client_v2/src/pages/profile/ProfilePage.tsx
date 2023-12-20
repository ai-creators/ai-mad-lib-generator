import { useState } from "react";
import { AccountModel } from "../../models/AccountModel";

const ProfilePage = () => {
  const [account, setAccount] = useState<AccountModel | null>(null);
  return <div>ProfilePage</div>;
};

export default ProfilePage;
