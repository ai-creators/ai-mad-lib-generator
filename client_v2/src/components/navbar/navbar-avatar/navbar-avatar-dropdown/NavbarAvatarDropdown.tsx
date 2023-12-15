import { Link } from "react-router-dom";
import ButtonLogout from "../../../button/button-logout/ButtonLogout";
import { useAppSelector } from "../../../../hooks/useAppSelector";
import { useAuth0 } from "@auth0/auth0-react";

const NavbarAvatarDropdown = () => {
  const { account } = useAppSelector((state) => state.account);
  const { user } = useAuth0();
  return (
    <div className="drop-shadow text-black absolute top-[100%] right-0 border border-zinc-300 rounded bg-white w-64 p-3 fade-in ease-in duration-200">
      <div className="py-2 border-b border-zinc-300">
        <Link
          to="/profile"
          className="px-3 py-2 block w-full test-start flex flex-col gap-1 bg-white duration-200 ease-out hover:bg-indigo-200 hover:text-indigo-700 hover:underline underline-offset-2 rounded"
        >
          <span>{user ? user.nickname : null}</span>
          <span className="text-sm text-zinc-400">
            {account && account.username ? `@${account.username}` : null}
          </span>
        </Link>
      </div>
      <div className="py-2 border-b border-zinc-300">
        <Link
          to="/profile"
          className="px-3 w-full text-start block py-2 bg-white duration-200 ease-out hover:bg-indigo-200 hover:text-indigo-700 hover:underline underline-offset-2 rounded"
        >
          Profile
        </Link>
        <Link
          to="/saves"
          className="px-3 w-full text-start block py-2 bg-white duration-200 ease-out hover:bg-indigo-200 hover:text-indigo-700 hover:underline underline-offset-2 rounded"
        >
          Saves
        </Link>
      </div>
      <div className="py-2 block">
        <ButtonLogout />
      </div>
    </div>
  );
};

export default NavbarAvatarDropdown;