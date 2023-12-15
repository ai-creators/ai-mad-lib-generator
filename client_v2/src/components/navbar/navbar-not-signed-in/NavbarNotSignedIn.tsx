import ButtonLogin from "../../button/button-login/ButtonLogin";
import ButtonSignup from "../../button/button-signup/ButtonSignup";

const NavbarNotSignedIn = () => {
  return (
    <ul className="flex items-center gap-5">
      <li>
        <ButtonLogin />
      </li>
      <li>
        <ButtonSignup />
      </li>
    </ul>
  );
};

export default NavbarNotSignedIn;