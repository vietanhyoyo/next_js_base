"use client";
import * as React from "react";
import { ModeToggle } from "@/components/theme-toggle";
import { InputSearch } from "@/components/custom/input-search";
import { MenuItem } from "@/components/custom/menu-item";
import Link from "next/link";
import DrawerMenu from "@/components/custom/draw-menu";
import { usePathname, useRouter } from "next/navigation";
import LogoHorizontal from "@/components/logo-horizontal";
import { Button } from "./ui/button";

export interface IHeaderNav {
  name: string;
  href: string;
}

export default function MainHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const shouldHideHeader =
    pathname.includes("/auth") || pathname.includes("/admin");

  const links: IHeaderNav[] = [
    { name: "HOME", href: "/" },
    { name: "KOREAN", href: "/korean" },
    { name: "NEWS", href: "/news/1" },
    { name: "SOCIAL MEDIA", href: "/social-media" },
    { name: "TIKTOKER", href: "/tiktoker" },
  ];

  const handleSearch = () => {};

  const handleLoginClick = () => {
    router.push("/auth/login");
  };

  if (shouldHideHeader) return null;

  return (
    <header className="bg-card-header backdrop-blur-lg fixed w-full z-50">
      <div className="container flex items-center justify-between py-4 w-full max-w-screen-xl px-4 xl:px-0">
        <Link href="/" className="text-primary">
          <LogoHorizontal />
        </Link>
        <nav className="hidden lg:block">
          <ul className="flex space-x-10">
            {links.map((link, index) => (
              <li key={index}>
                <MenuItem isSelected={pathname === link.href}>
                  <Link href={link.href} className="hover:underline">
                    {link.name}
                  </Link>
                </MenuItem>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-3">
          <Button variant={"outline"} onClick={handleLoginClick}>
            Login
          </Button>
          <ModeToggle className="hidden lg:flex" />
          <InputSearch onSearch={handleSearch} />
          <DrawerMenu navList={links} />
        </div>
      </div>
    </header>
  );
}
