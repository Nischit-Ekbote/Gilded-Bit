import { Link } from "react-router-dom";

import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import "./NavBar.css";
import { useState } from "react";

function NavBar() {
  const [isActive, setIsActive] = useState("home");

  return (
    <div className="navBar__container h-screen">
      <nav
        style={{
          flexDirection: "column",
        }}
      >
        <div className="flex flex-col">
          {/* <h1 className="logo text-2xl my-6">GB</h1> */}
          <img src="/Logo.svg" alt="" className="h-[20px] my-10"/>
          <ul
            style={{
              flexDirection: "column",
            }}
          >
            <li
              onClick={() => {
                setIsActive("home");
              }}
            >
              <Link
                to="/"
                style={{
                  color: isActive === "home" ? "#FFC300" : "white",
                }}
              >
                HOME
              </Link>
            </li>
            <li
              onClick={() => {
                setIsActive("about");
              }}
            >
              <Link
                to="/about"
                style={{
                  color: isActive === "about" ? "#FFC300" : "white",
                }}
              >
                ABOUT
              </Link>
            </li>
            <li
              onClick={() => {
                setIsActive("buy");
              }}
            >
              <Link
                to="/buy/gold"
                style={{
                  color: isActive === "buy" ? "#FFC300" : "white",
                }}
              >
                BUY
              </Link>
            </li>
            <li
              onClick={() => {
                setIsActive("sell");
              }}
            >
              <Link
                to="/sell/gold"
                style={{
                  color: isActive === "sell" ? "#FFC300" : "white",
                }}
              >
                SELL
              </Link>
            </li>
          </ul>
        </div>

        <SignedOut>
          <SignInButton />
        </SignedOut>

        <SignedIn>
          <UserButton />
        </SignedIn>
      </nav>
    </div>
  );
}

export default NavBar;
