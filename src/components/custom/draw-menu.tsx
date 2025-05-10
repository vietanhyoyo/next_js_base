import React from "react";
import { IHeaderNav } from "@/components/header";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { MenuItem } from "@/components/custom/menu-item";
import Link from "next/link";
import { ModeToggle } from "@/components/theme-toggle";

interface DrawerMenuProps {
  navList: IHeaderNav[];
}

const DrawerMenu: React.FC<DrawerMenuProps> = ({ navList }) => {
  return (
    <Sheet>
      <SheetTrigger asChild className="lg:hidden">
        <Button variant="outline" size="icon" className="hover:text-primary">
          <Menu className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="bg-card-header">
        <SheetHeader className="pb-8">
          <Link href="/" className="text-2xl font-bold text-primary">
            Logo
          </Link>
        </SheetHeader>
        <div>
          <nav className="grid gap-4 py-4">
            {navList.map((link, index) => (
              <Button
                key={index}
                className="w-full justify-start"
                variant="ghost"
              >
                {link.name}
              </Button>
            ))}
          </nav>
          <div className="px-2">
            <ModeToggle />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default DrawerMenu;
