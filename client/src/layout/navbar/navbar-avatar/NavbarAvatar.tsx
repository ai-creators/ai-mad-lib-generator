import Avatar from "@/components/avatar/Avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavbarAvatar } from "./NavbarAvatar.hooks";
import { Link } from "react-router-dom";

type Props = {
  width?: string;
  height?: string;
  avatarUrl?: string;
  id?: string;
};

const NavbarAvatar = ({
  width = "w-8",
  height = "h-8",
  avatarUrl,
  id = "",
}: Props) => {
  const { account, user, handleLogout, handleRedirect } = useNavbarAvatar();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          id="navbar-avatar-button"
          className="p-1 hover:bg-zinc-200 dark:hover:bg-zinc-800 duration-200 ease-out rounded-full"
        >
          <Avatar avatarUrl={avatarUrl} width={width} height={height} id={id} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64 p-2 mt-3">
        <DropdownMenuItem
          className="p-3 hover:underline underline-offset-2"
          onClick={() => handleRedirect("/profile")}
        >
          <Link to="/profile" className="w-full">
            <span>{user ? user.nickname : null}</span>
            <span className="text-sm text-zinc-400">
              {account && account.username ? `@${account.username}` : null}
            </span>
          </Link>
        </DropdownMenuItem>
        <hr className="my-2" />
        <DropdownMenuItem
          className="p-3 hover:underline underline-offset-2"
          onClick={() => handleRedirect("/profile")}
        >
          <Link to="/profile" className="w-full">
            Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="p-3 hover:underline underline-offset-2"
          onClick={() => handleRedirect("/saves")}
        >
          <Link to="/saves" className="w-full">
            Saves
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="p-3 hover:underline underline-offset-2"
          onClick={() => handleRedirect("/settings")}
        >
          <Link to="/settings" className="w-full">
            Settings
          </Link>
        </DropdownMenuItem>
        <hr className="my-2" />
        <DropdownMenuItem
          onClick={handleLogout}
          className="p-3 hover:underline underline-offset-2"
        >
          Log Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  // return (
  //   <OutsideAlerter executable={closeDropdown}>
  //     <button
  //       id="navbar-avatar-button"
  //       className="p-1 hover:bg-zinc-300 dark:hover:bg-zinc-800 duration-200 ease-out rounded-full"
  //       onClick={toggleDropdown}
  //     >
  //       <Avatar avatarUrl={avatarUrl} width={width} height={height} id={id} />
  //     </button>
  //     {isDropdownOpen && <NavbarAvatarDropdown />}
  //   </OutsideAlerter>
  // );
};

export default NavbarAvatar;
