import React from 'react';
import { BadgeInfo, Receipt, ShoppingCart } from "lucide-react";
import { FloatingDock } from "../components/ui/Floating-dock";
import { IconHome } from "@tabler/icons-react";

const links = [
  {
    title: "Home",
    icon: <IconHome className="h-full w-full text-black dark:text-neutral-300" />,
    href: "/",
  },
  {
    title: "About",
    icon: <BadgeInfo className="h-full w-full text-black dark:text-neutral-300" />,
    href: "/about",
  },
  {
    title: "Buy",
    icon: <ShoppingCart className="h-full w-full text-black dark:text-neutral-300" />,
    href: "/buy/gold",
  },
  {
    title: "Sell",
    icon: <Receipt className="h-full w-full text-black dark:text-neutral-300" />,
    href: "/sell/gold",
  }
];

export const FloatingDockDemo = React.memo(() => {
  return (
    <div className="flex items-center justify-center h-[35rem] w-full">
      <FloatingDock items={links} />
    </div>
  );
});

FloatingDockDemo.displayName = 'FloatingDockDemo';