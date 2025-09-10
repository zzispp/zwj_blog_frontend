"use client";

import * as React from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { MenuIcon, X, Home, BookOpen, Code2, User, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";

import { SLOGAN, WEBSITE } from "@/constants";
import { cn } from "@/lib/utils";

import { navItems } from "./config";

// 为每个导航项添加图标
const getNavIcon = (label: string) => {
  switch (label) {
    case "首页":
      return <Home className="size-4" />;
    case "博客":
      return <BookOpen className="size-4" />;
    case "代码片段":
      return <Code2 className="size-4" />;
    case "关于":
      return <User className="size-4" />;
    default:
      return <Sparkles className="size-4" />;
  }
};

export const MobileNav = () => {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          aria-label="打开菜单"
          className={cn(
            "sm:hidden relative z-50 size-10 rounded-full",
            "hover:bg-accent/50 transition-all duration-200",
            "focus:ring-2 focus:ring-primary/20"
          )}
        >
          <MenuIcon className="size-5" />
        </Button>
      </SheetTrigger>

      <SheetContent
        side="left"
        className={cn(
          "w-[320px] border-r-0 p-0",
          "bg-gradient-to-b from-background via-background to-muted/20",
          "[&>button]:hidden" // 隐藏默认的关闭按钮
        )}
      >
        <SheetTitle className="sr-only">网站导航菜单</SheetTitle>
        {/* 头部区域 */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10" />
          <div className="relative px-6 py-8">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                {WEBSITE}
              </h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setOpen(false)}
                className="size-8 rounded-full hover:bg-accent/50 transition-all duration-200"
              >
                <X className="size-4" />
              </Button>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {SLOGAN}
            </p>
          </div>
        </div>

        {/* 导航区域 */}
        <div className="px-4 py-2">
          <nav className="space-y-2">
            {navItems.map((item, index) => {
              const isActive = pathname === item.link;
              return (
                <Link
                  key={item.link}
                  href={item.link}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "group flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-300",
                    "hover:translate-x-1 hover:shadow-sm",
                    isActive
                      ? "bg-gradient-to-r from-primary to-primary/90 text-primary-foreground shadow-lg shadow-primary/25"
                      : "hover:bg-accent/60 hover:text-foreground text-muted-foreground"
                  )}
                  style={{
                    animationDelay: `${index * 100}ms`,
                  }}
                >
                  <div className={cn(
                    "flex items-center justify-center size-8 rounded-lg transition-all duration-300",
                    isActive
                      ? "bg-white/20 text-primary-foreground"
                      : "bg-accent/50 group-hover:bg-accent group-hover:scale-110"
                  )}>
                    {getNavIcon(item.label || "")}
                  </div>
                  <span className="font-medium tracking-wide">
                    {item.label}
                  </span>
                  {isActive && (
                    <div className="ml-auto">
                      <div className="size-2 rounded-full bg-white/60 animate-pulse" />
                    </div>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* 底部装饰 */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-muted/30 to-transparent pointer-events-none" />
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
          <div className="flex items-center gap-1">
            <div className="size-1.5 rounded-full bg-primary/40 animate-pulse" />
            <div className="size-1.5 rounded-full bg-primary/60 animate-pulse" style={{ animationDelay: '0.5s' }} />
            <div className="size-1.5 rounded-full bg-primary/40 animate-pulse" style={{ animationDelay: '1s' }} />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
