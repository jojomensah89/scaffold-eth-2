"use client";

import React, { useCallback, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bars3Icon, BugAntIcon } from "@heroicons/react/24/outline";
import { FaucetButton, RainbowKitCustomConnectButton } from "~~/components/scaffold-eth";
import { Button } from "~~/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "~~/components/ui/dropdown-menu";
import { useOutsideClick } from "~~/hooks/scaffold-eth";
import { cn } from "~~/lib/utils";

type HeaderMenuLink = {
  label: string;
  href: string;
  icon?: React.ReactNode;
};

export const menuLinks: HeaderMenuLink[] = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Debug Contracts",
    href: "/debug",
    icon: <BugAntIcon className="h-4 w-4" />,
  },
];

export const HeaderMenuLinks = () => {
  const pathname = usePathname();

  return (
    <>
      {menuLinks.map(({ label, href, icon }) => {
        const isActive = pathname === href;
        return (
          <li key={href} className="list-none">
            <Link
              href={href}
              className={cn(
                "flex items-center gap-2 px-3 py-1.5 text-sm rounded-full transition-colors",
                "hover:bg-secondary/80 hover:text-secondary-foreground",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                isActive && "bg-secondary text-secondary-foreground shadow-sm",
              )}
            >
              {icon}
              <span>{label}</span>
            </Link>
          </li>
        );
      })}
    </>
  );
};

/**
 * Site header
 */
export const Header = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const burgerMenuRef = useRef<HTMLDivElement>(null);
  useOutsideClick(
    burgerMenuRef,
    useCallback(() => setIsDrawerOpen(false), []),
  );

  return (
    <header className="sticky lg:static top-0 flex items-center justify-between w-full h-16 px-4 py-2 z-20 bg-background border-b">
      <div className="flex items-center gap-4 w-auto lg:w-1/2">
        <div className="lg:hidden" ref={burgerMenuRef}>
          <DropdownMenu open={isDrawerOpen}>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className={cn("px-2", isDrawerOpen && "bg-secondary")} onClick={() => setIsDrawerOpen(!isDrawerOpen)}>
                <Bars3Icon className="h-6 w-6" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-52 mt-2">
              <nav className="grid gap-1 p-2" onClick={() => setIsDrawerOpen(false)}>
                <HeaderMenuLinks />
              </nav>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <Link href="/" className="hidden lg:flex items-center gap-2 shrink-0">
          <div className="flex relative w-10 h-10">
            <Image alt="SE2 logo" className="cursor-pointer" fill src="/logo.svg" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold leading-tight">Scaffold-ETH</span>
            <span className="text-xs">Ethereum dev stack</span>
          </div>
        </Link>
        <nav className="hidden lg:flex items-center gap-2">
          <HeaderMenuLinks />
        </nav>
      </div>
      <div className="flex items-center gap-2">
        <RainbowKitCustomConnectButton />
        <FaucetButton />
      </div>
    </header>
  );
};
