import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AccountService from "../../services/AccountService";
import { useAuth0 } from "@auth0/auth0-react";
import { useAppSelector } from "../../hooks/useAppSelector";

const AccountDoesNotExistBanner = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { user, getAccessTokenSilently } = useAuth0();

  const { account } = useAppSelector((state) => state.account);

  useEffect(() => {
    (async () => {
      if (user?.sub && !account.username) {
        const accessToken = await getAccessTokenSilently();
        const { data } = await AccountService.isAccountSetup(
          user.sub,
          accessToken
        );
        setIsOpen(data === false);
      }
    })();
  }, [account.username, getAccessTokenSilently, user?.sub]);

  return isOpen ? (
    <div className="flex justify-center  items-center gap-5 p-1 text-sm bg-green-800 text-white">
      <p>
        You're account isn't finished being setup. To finish setting up your
        account,{" "}
        <Link to="/account/setup" className="underline underline-offset-2">
          click here
        </Link>
      </p>
      <button
        onClick={() => setIsOpen(false)}
        className="hover:bg-green-900 active:bg-green-950 duration-200 ease-out w-8 h-8 flex items-center justify-center rounded"
      >
        <i className="fa-solid fa-xmark"></i>
      </button>
    </div>
  ) : null;
};

export default AccountDoesNotExistBanner;
