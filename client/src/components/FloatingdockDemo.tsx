// FloatingDockDemo.tsx
import React from 'react';
import { BadgeInfo, Receipt, ShoppingCart } from "lucide-react";
import { FloatingDock } from "../components/ui/Floating-dock";
import { FloatingDockHorizontal } from './ui/Floating-dock_horizontal';
import { IconHome } from "@tabler/icons-react";
import getWidth from "../lib/getWidth"

const links = [
  {
    title: "Home",
    icon: <IconHome className="h-full w-full text-[--primary--] dark:text-neutral-300" />,
    href: "/",
  },
  {
    title: "About",
    icon: <BadgeInfo className="h-full w-full text-[--primary--] dark:text-neutral-300" />,
    href: "/about",
  },
  {
    title: "Buy",
    icon: <ShoppingCart className="h-full w-full text-[--primary--] dark:text-neutral-300" />,
    href: "/buy/gold",
  },
  {
    title: "Sell",
    icon: <Receipt className="h-full w-full text-[--primary--] dark:text-neutral-300" />,
    href: "/sell/gold",
  }
];

export const FloatingDockDemo = React.memo(() => {
 
  return (
    <div className="flex items-center justify-center lg:h-[35rem] w-fit">
      {
        getWidth().width > 1024 ? <FloatingDock items={links} /> : <FloatingDockHorizontal items={links} />
      }
    </div>
  );
});

FloatingDockDemo.displayName = 'FloatingDockDemo';