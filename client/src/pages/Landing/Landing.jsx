import React from "react";
import styles from "./Landing.module.css";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <>
      <header>
        <nav className="fixed left-0 right-0 top-0 text-white p-4">
          <div className="container mx-auto">
            <Link to="/">
              <h1 className="text-xl font-semibold">ai ad-lib generator</h1>
            </Link>
          </div>
        </nav>
        <section className={`${styles.hero} text-white`}>
          <div className="container mx-auto flex flex-col gap-3">
            <h2 className={`${styles.title} text-6xl max-w-[40%]`}>
              Generate Random Ad-Libs With Ai
            </h2>
            <p className={`${styles.description}`}></p>
            <div>
              <Link
                to="/dashboard"
                className="px-3 py-2 bg-red-500 rounded text-black"
              >
                Get Started
              </Link>
            </div>
          </div>
        </section>
      </header>
      <main></main>
      <footer>
        <div className="container mx-auto p-4">
          <div>
            <h5>AI-LIB</h5>
            <p>This website was built for Ai Wrangler hackathon.</p>
          </div>
          <div>
            <h5>AI-LIB</h5>
            <p>This website was built for Ai Wrangler hackathon.</p>
          </div>
          <div>
            <h5>AI-LIB</h5>
            <p>This website was built for Ai Wrangler hackathon.</p>
          </div>
        </div>
        <div className="p-4 bg-blue-500">
          <p className="text-center">Website made with love 💙</p>
        </div>
      </footer>
    </>
  );
};

export default Landing;
