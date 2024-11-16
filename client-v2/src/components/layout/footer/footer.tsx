import { Container } from "@/components/container/container";
import { Logo } from "@/components/logo/logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedinIn } from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <footer className="bg-foreground">
      <Container className="py-10 grid grid-cols-2 md:grid-cols-12 gap-8 md:gap-5 px-3 lg:px-0">
        <div className="flex flex-col gap-5 col-span-2 md:col-span-4">
          <Logo className="text-background" width={100} height={100} />
          <p className="text-muted">Online coding competitions.</p>
          <ul className="text-muted flex items-center gap-5">
            <li>
              <a
                href="https://github.com/algowars/algowars"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-background flex justify-center items-center w-8 h-8 rounded-full text-primary"
              >
                <FontAwesomeIcon icon={faGithub} />
              </a>
            </li>
            <li>
              <a
                href="https://github.com/algowars/algowars"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-background flex justify-center items-center w-8 h-8 rounded-full text-primary"
              >
                <FontAwesomeIcon icon={faLinkedinIn} />
              </a>
            </li>
          </ul>
        </div>
        <div className="flex flex-col gap-5 md:col-span-2">
          <h4 className="text-background font-semibold">Resources</h4>
          <ul className="text-muted flex flex-col gap-2">
            <li>
              <Link href="/contact">Contact Us</Link>
            </li>
            <li>
              <Link href="/contact">FAQ</Link>
            </li>
            <li>
              <Link href="/doc">Docs</Link>
            </li>
            <li>
              <Link href="/doc">Support</Link>
            </li>
          </ul>
        </div>
        <div className="flex flex-col gap-5 md:col-span-2">
          <h4 className="text-background font-semibold">Company</h4>
          <ul className="text-muted flex flex-col gap-2">
            <li>
              <Link href="/contact">About Us</Link>
            </li>
            <li>
              <Link href="/contact">Blog</Link>
            </li>
            <li>
              <Link href="/contact">Creators</Link>
            </li>
            <li>
              <Link href="/contact">Tools</Link>
            </li>
          </ul>
        </div>
        <div className="flex flex-col gap-5 col-span-2 md:col-span-4">
          <p className="text-muted font-semibold">
            Subscribe to our newsletter
          </p>
          <Input
            placeholder="Enter your email address"
            className="border-muted-foreground/40 bg-foreground"
          />
          <div>
            <Button variant={"secondary"} className="w-28">
              Sign up
            </Button>
          </div>
        </div>
      </Container>
      <div className="border-t border-muted-foreground/40 px-3 lg:px-0">
        <Container className="py-5 flex flex-wrap justify-center md:justify-start items-center gap-5">
          <p className="text-muted text-sm font-semibold">
            &copy; 2024 Algowars
          </p>
          {/* <a
            href="https://github.com/algowars/algowars"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted ml-auto"
          ></a> */}
        </Container>
      </div>
    </footer>
  );
};

export default Footer;
