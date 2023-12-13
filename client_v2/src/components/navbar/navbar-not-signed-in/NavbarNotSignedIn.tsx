import { Link } from "react-router-dom";
import ButtonLogin from "../../button/button-login/ButtonLogin";
import ButtonSignup from "../../button/button-signup/ButtonSignup";

const NavbarNotSignedIn = () => {
  return (
    <ul className="flex items-center gap-5">
      <li>
        <Link to="/" className="p-3">
          Home
        </Link>
      </li>
      <li>
        <Link to="/questions" className="p-3">
          Questions
        </Link>
      </li>
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
