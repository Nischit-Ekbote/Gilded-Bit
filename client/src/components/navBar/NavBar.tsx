import React, { lazy } from "react";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import "./NavBar.css";

const LazyFloatingDockDemo = lazy(() =>
  import("../FloatingdockDemo").then((module) => ({
    default: module.FloatingDockDemo,
  }))
);

interface NavBarProps {}

const NavBar: React.FC<NavBarProps> = () => {
  return (
    <div className="navBar__container lg:h-screen lg:w-[100px] sm:w-full w-full absolute z-50 ">
      <nav className="flex lg:flex-col w-full sm:h-[100px] h-[100px] lg:h-full justify-between items-center p-4">

          <img src="/Logo.svg" alt="Logo" className="h-[20px] w-fit" />
              <LazyFloatingDockDemo />

        <div className="">
          <SignedOut>
            <SignInButton />
          </SignedOut>

          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </nav>
    </div>
  );
};

export default React.memo(NavBar);
