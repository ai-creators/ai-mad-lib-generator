import { Link } from "react-router-dom";
import Container from "../Container/Container";

const Footer = () => {
  return (
    <footer className="py-5 lg:py-16 px-3">
      <Container className="flex flex-col gap-5 lg:gap-16">
        <div className="footer-grid gap-y-5 gap-x-3 md:gap-x-0 xl:gap-0">
          <div className="flex flex-col gap-3 footer-1">
            <h6 className="uppercase font-bold">Discover</h6>
            <ul className="flex flex-col gap-2">
              <li>
                <Link to="/">Instructions</Link>
              </li>
              <li>
                <Link to="/">Physical Games</Link>
              </li>
              <li>
                <Link to="/">Digital Games</Link>
              </li>
              <li>
                <Link to="/">Greeting Cards</Link>
              </li>
              <li>
                <Link to="/">Puzzles</Link>
              </li>
              <li>
                <Link to="/">Collectible</Link>
              </li>
            </ul>
          </div>
          <div className="flex flex-col gap-3 footer-2">
            <h6 className="uppercase font-bold">Our Company</h6>
            <ul className="flex flex-col gap-2">
              <li>
                <Link to="/">About Us</Link>
              </li>
              <li>
                <Link to="/">Our Blog</Link>
              </li>
              <li>
                <Link to="/">Kitty Convict Project</Link>
              </li>
              <li>
                <Link to="/">The Oatmeal</Link>
              </li>
              <li>
                <Link to="/">Careers</Link>
              </li>
            </ul>
          </div>
          <div className="flex flex-col gap-3 footer-3">
            <h6 className="uppercase font-bold">Support</h6>
            <ul className="flex flex-col gap-2">
              <li>
                <Link to="/">Contact</Link>
              </li>
              <li>
                <Link to="/">Help Center</Link>
              </li>
              <li>
                <Link to="/">Recall</Link>
              </li>
              <li>
                <Link to="/">MAP Policy</Link>
              </li>
            </ul>
          </div>
          <div className="flex flex-col gap-3 footer-4">
            <div>
              <h6 className="uppercase font-bold">Follow Us</h6>
              <p>See the latest features and updates.</p>
            </div>
            <ul className="flex gap-2">
              <li>
                <Link
                  to="/"
                  className="hover:bg-zinc-950 hover:text-white duration-200 ease-out rounded-full w-8 h-8 flex justify-center items-center"
                >
                  <i className="fa-brands fa-facebook-f"></i>
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="hover:bg-zinc-950 hover:text-white duration-200 ease-out rounded-full w-8 h-8 flex justify-center items-center"
                >
                  <i className="fa-brands fa-twitter"></i>
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="hover:bg-zinc-950 hover:text-white duration-200 ease-out rounded-full w-8 h-8 flex justify-center items-center"
                >
                  <i className="fa-brands fa-tiktok"></i>
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="hover:bg-zinc-950 hover:text-white duration-200 ease-out rounded-full w-8 h-8 flex justify-center items-center"
                >
                  <i className="fa-brands fa-instagram"></i>
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="hover:bg-zinc-950 hover:text-white duration-200 ease-out rounded-full w-8 h-8 flex justify-center items-center"
                >
                  <i className="fa-brands fa-youtube"></i>
                </Link>
              </li>
            </ul>
          </div>
          <div className="flex flex-col gap-3 footer-5">
            <div>
              <h6 className="uppercase font-bold">Email List</h6>
              <p>
                Sign up and we&apos;ll let you know first when we do anything:
              </p>
            </div>

            <input type="text" className="p-3 border border-zinc-950 rounded" />
          </div>
        </div>

        <div className="flex md:justify-between flex-col gap-3 md:flex-row md:items-center text-sm">
          <p>
            Copyright © 2023 All rights reserved by{" "}
            <span className="font-bold">Ai Ad Libs</span>
          </p>
          <ul className="flex gap-3 items-center">
            <li>
              <Link to="/">Privacy Policy</Link>
            </li>
            <li>
              <Link to="/">Terms of Service</Link>
            </li>
            <li>
              <Link to="/">Cookie Policy</Link>
            </li>
            <li>
              <Link to="/">Sitemap</Link>
            </li>
          </ul>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
