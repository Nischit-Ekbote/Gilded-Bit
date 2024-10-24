import React, { lazy, Suspense } from "react";
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
    <div className="navBar__container h-screen w-[100px] absolute z-50">
      <nav style={{ flexDirection: "column" as const }}>
        <div className="flex flex-col">
          <img src="/Logo.svg" alt="Logo" className="h-[20px]" />
              <LazyFloatingDockDemo />
          </div>

        <div className="absolute bottom-10">
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
