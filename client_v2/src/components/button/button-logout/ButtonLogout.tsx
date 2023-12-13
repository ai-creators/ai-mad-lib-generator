import { useAuth0 } from "@auth0/auth0-react";

const ButtonLogout = () => {
  const { logout } = useAuth0();

  const handleLogout = () => {
    logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    });
  };

  return (
    <button
      className="px-3 w-full text-start block py-2 bg-zinc-900 duration-200 ease-out hover:bg-zinc-800 rounded"
      onClick={handleLogout}
    >
      Log Out
    </button>
  );
};

export default ButtonLogout;
