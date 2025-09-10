import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";

import { NICKNAME, PATHS } from "@/constants";
import { TypeIntro } from "@/features/home";
import { cn } from "@/lib/utils";

export const HeroSection = () => {
  return (
    <div
      className={`
        flex min-h-full max-w-screen-md flex-col justify-center gap-5 px-6
        md:px-10
        2xl:max-w-7xl
      `}
    >
      <p
        className={`
          text-2xl tracking-widest
          md:text-5xl
        `}
      >
        GM! 你好，欢迎来到
      </p>
      <strong
        className={cn(
          `
            bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-5xl font-black
            tracking-widest
            md:text-8xl
          `,
        )}
        style={{
          WebkitTextFillColor: "transparent",
        }}
      >
        {NICKNAME}的小岛
      </strong>
      <div>
        <TypeIntro />
      </div>
      <p
        className={cn(`
          text-2xl tracking-widest
          md:text-5xl
        `)}
      >
        熟悉
        <span className={`font-semibold text-[#00ADD8]`}>Golang</span>、
        <span className={`font-semibold text-[#CE422B]`}>Rust</span>、
        <span className={`font-semibold text-[#007acc]`}>TypeScript</span>
        <span className="ml-4">🚀 ~</span>
      </p>
      <p
        className={cn(
          `
            text-base tracking-widest text-muted-foreground
            md:text-2xl
          `,
        )}
      >
        GM & GN - Good Morning 开启探索，Good Night 总结收获，24/7 不停歇地在区块链世界构建未来 🌅🌙
      </p>
      <div className={cn("flex space-x-4")}>
        <Link
          href={PATHS.SITE_BLOG}
          className={cn(buttonVariants({ variant: "outline" }))}
        >
          我的博客
        </Link>
        <Link
          href={PATHS.SITE_ABOUT}
          className={cn(buttonVariants({ variant: "outline" }))}
        >
          关于我
        </Link>
      </div>


    </div>
  );
};
