"use client";
import { FloatingButton } from "@/components/custom/floating-button";
import LogoVertical from "@/components/logo-vertical";
import { ModeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { accessToken } from "@/constants";
import { setCookie } from 'cookies-next';
import { fetchLogin } from "@/services/modules/auth.service";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = React.useState("admin@gmail.com");
  const [password, setPassword] = React.useState("admin");
  const { toast } = useToast();

  const handleSubmit = React.useCallback(
    async (e: any) => {
      e.preventDefault();
      await fetchLogin({ email: email, password: password })
        .then(({ data, msg, status }: any) => {
          if (status != 200) {
            toast({
              variant: "destructive",
              title: "Error!!!",
              description: "There was a problem with your request.",
            });
          } else {
            toast({
              variant: "default",
              title: "Login success!!!",
            });
            setCookie(accessToken, data.access_token, {
              maxAge: 60 * 60 * 24, 
              path: "/", 
            });
            router.push("/admin/user");
          }
        })
        .catch((err) => {
          console.log(err.message);
          toast({
            variant: "destructive",
            title: err.message,
          });
        });
    },
    [email, password]
  );

  return (
    <div className="flex items-center justify-start min-h-screen">
      <div className="flex justify-center flex-col bg-white/65 dark:bg-black/30 w-full h-screen md:max-w-md align-middle">
        <div className="m-auto p-8 space-y-6 items-center min-w-96 w-10/12">
          <div className="w-full flex justify-center">
            <LogoVertical />
          </div>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <Label htmlFor="email" className="block text-sm font-medium">
                Email
              </Label>
              <Input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <Label htmlFor="password" className="block text-sm font-medium">
                Password
              </Label>
              <Input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <Button
              type="submit"
              className="w-full px-4 py-2 text-white rounded focus:outline-none focus:ring-2"
            >
              Login
            </Button>
          </form>
          <p className="text-sm text-center">
            Return to{" "}
            <Link href="/" className="text-primary hover:underline">
              Home
            </Link>
          </p>
        </div>
      </div>
      <FloatingButton>
        <ModeToggle />
      </FloatingButton>
    </div>
  );
}
