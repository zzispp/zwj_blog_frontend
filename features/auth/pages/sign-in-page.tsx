"use client";

import * as React from "react";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { ModeToggle } from "@/components/mode-toggle";

import { PATHS } from "@/constants";

import { SolanaSignIn } from "../components/solana-sign-in";

export const SignInPage = () => {
  const router = useRouter();
  const [isPending, startTransition] = React.useTransition();

  return (
    <div className="grid h-screen w-screen place-content-center">
      <Card
        className={`
          relative w-[320px] rounded-3xl py-4
          sm:w-full sm:max-w-none sm:min-w-[360px]
        `}
      >
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>后台登录</span>
            <ModeToggle />
          </CardTitle>
          <CardDescription>使用 Solana 钱包进行登录</CardDescription>
        </CardHeader>
        <CardContent>
          <SolanaSignIn isPending={isPending} startTransition={startTransition} />
        </CardContent>
        <CardFooter>
          <Button
            variant="secondary"
            className="!w-full"
            type="button"
            disabled={isPending}
            onClick={handleGoHome}
          >
            回首页
          </Button>
        </CardFooter>
      </Card>
    </div >
  );

  function handleGoHome() {
    router.push(PATHS.SITE_HOME);
  }
};
