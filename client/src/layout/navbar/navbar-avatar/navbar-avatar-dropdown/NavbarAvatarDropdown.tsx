import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useAppSelector } from "@/hooks/useAppSelector";
import LogoutButton from "@/components/button/auth/LogoutButton";
import { Card } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const NavbarAvatarDropdown = () => {
  const { account } = useAppSelector((state) => state.account);
  const { user } = useAuth0();

  return (
    <Card className="absolute top-[130%] right-0 border w-[95%] left-1/2 -translate-x-1/2 md:left-[unset] md:-translate-x-0 md:right-5 md:w-64 p-3 z-50 fade-in ease-in duration-200">
      <div className="py-2 border-b">
        <Link
          to={`/profile/${account.username}`}
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "text-left justify-start w-full"
          )}
        >
          <span>{user ? user.nickname : null}</span>
          <span className="text-sm text-zinc-400">
            {account && account.username ? `@${account.username}` : null}
          </span>
        </Link>
      </div>
      <div className="py-2 border-b flex flex-col gap-1">
        <Link
          to={`/profile/${account.username}`}
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "text-left justify-start"
          )}
        >
          Profile
        </Link>
        <Link
          to="/saves"
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "text-left justify-start"
          )}
        >
          Saves
        </Link>
        <Link
          to="/settings"
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "text-left justify-start"
          )}
        >
          Settings
        </Link>
      </div>
      <div className="py-2 block">
        <LogoutButton className="w-full text-start justify-start" />
      </div>
    </Card>
  );
};

export default NavbarAvatarDropdown;

{
  /* <div className="drop-shadow text-black absolute top-[130%] right-0 border rounded bg-white w-[95%] left-1/2 -translate-x-1/2 md:left-[unset] md:-translate-x-0 md:right-5 md:w-64 p-3 z-50 fade-in ease-in duration-200">
  <div className="py-2 border-b">
    <Link
      to={`/profile/${account.username}`}
      className="px-3 py-2 block w-full test-start flex flex-col gap-1 bg-white duration-200 ease-out hover:bg-indigo-200 hover:text-indigo-700 hover:underline underline-offset-2 rounded"
    >
      <span>{user ? user.nickname : null}</span>
      <span className="text-sm text-zinc-400">
        {account && account.username ? `@${account.username}` : null}
      </span>
    </Link>
  </div>
  <div className="py-2 border-b">
    <Link
      to={`/profile/${account.username}`}
       className={buttonVariants({ variant: "ghost"})}
    >
      Profile
    </Link>
    <Link
      to="/saves"
       className={buttonVariants({ variant: "ghost"})}
    >
      Saves
    </Link>
    <Link
      to="/settings"
       className={buttonVariants({ variant: "ghost"})}
    >
      Settings
    </Link>
  </div>
  <div className="py-2 block">
    <LogoutButton />
  </div>
</div> */
}
