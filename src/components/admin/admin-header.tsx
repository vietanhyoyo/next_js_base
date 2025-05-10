"use client";
import * as React from "react";
import { ModeToggle } from "@/components/theme-toggle";
import { InputSearch } from "@/components/custom/input-search";
import { MenuItem } from "@/components/custom/menu-item";
import Link from "next/link";
import DrawerMenu from "@/components/custom/draw-menu";
import { usePathname, useRouter } from "next/navigation";
import LogoHorizontal from "@/components/logo-horizontal";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "../ui/navigation-menu";
import { cn } from "@/lib/utils";

export interface IHeaderNav {
  name: string;
  href: string;
}

export default function AdminHeader() {

  const components: { title: string; href: string; description: string }[] = [
    {
      title: "Tag",
      href: "/admin/tag",
      description:
        "Manage and update tags associated with idols to categorize and organize them effectively.",
    },
    {
      title: "Idol",
      href: "/admin/idol",
      description:
        "Manage and update idol information, including details, images, and associated tags.",
    },
    {
      title: "News",
      href: "/admin/news",
      description:
        "Manage and update news, including contents, images, and associated tags.",
    },
  ];

  return (
    <header className="bg-card-header backdrop-blur-lg fixed w-full z-50">
      <div className="container flex items-center justify-between py-4 w-full max-w-screen-xl px-4 xl:px-0">
        <Link href="/" className="text-primary">
          <LogoHorizontal />
        </Link>
        <div className="flex items-center gap-3">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>News</NavigationMenuTrigger>
                <NavigationMenuContent className="right-0">
                  <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <a
                          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                          href="/"
                        >
                          <div className="mb-2 mt-4 text-lg font-medium">
                            shadcn/ui
                          </div>
                          <p className="text-sm leading-tight text-muted-foreground">
                            Beautifully designed components built with Radix UI
                            and Tailwind CSS.
                          </p>
                        </a>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Content</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-1 lg:w-[300px] ">
                    {components.map((component) => (
                      <ListItem
                        key={component.title}
                        title={component.title}
                        href={component.href}
                      >
                        {component.description}
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/admin/user" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Account
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          <ModeToggle className="hidden lg:flex" />
        </div>
      </div>
    </header>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
