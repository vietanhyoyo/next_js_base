"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import LogoVertical from "@/components/logo-vertical";

export default function Footer() {
  const pathname = usePathname();
  const shouldHideHeader =
    pathname.includes("/auth") || pathname.includes("/admin");

  if (shouldHideHeader) return null;

  return (
    <footer className="bg-card-header backdrop-blur-lg w-full">
      <div className="container gap-4 flex flex-col justify-between py-4 w-full max-w-screen-xl px-4 xl:px-0">
        <Link href="/" className="text-2xl font-bold text-primary mt-4">
          <LogoVertical />
        </Link>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
          convallis interdum nisl, nec viverra sapien auctor non. Proin euismod,
          justo a facilisis feugiat, purus est pulvinar neque, non varius libero
          risus ac odio.
        </p>
        <p className="text-foreground">© 2024 - Dino</p>
      </div>
    </footer>
  );
}
