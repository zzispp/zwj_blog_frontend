"use client";

import * as React from "react";

import { useAuth } from "@/lib/auth-context";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Book, CodeXml, Home, LogOut, ScrollIcon, Tags, Menu, X, Sun, Moon, Monitor } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";

import {
  ImageAssets,
  NICKNAME,
  PATHS,
  PATHS_MAP,
  PLACEHOLDER_TEXT,
  WEBSITE,
} from "@/constants";
import { SignOutDialog } from "@/features/auth";
import { cn } from "@/lib/utils";

import { useTheme } from "next-themes";

export const adminNavItems: {
  label?: string;
  link: string;
  icon?: React.ReactNode;
  breadcrumbs?: string[];
  hidden?: boolean;
}[] = [
    {
      label: PATHS_MAP[PATHS.ADMIN_HOME],
      link: PATHS.ADMIN_HOME,
      icon: <Home className="size-4" />,
      breadcrumbs: [PATHS.ADMIN_HOME],
    },
    {
      label: PATHS_MAP[PATHS.ADMIN_TAG],
      link: PATHS.ADMIN_TAG,
      icon: <Tags className="size-4" />,
      breadcrumbs: [PATHS.ADMIN_HOME, PATHS.ADMIN_TAG],
    },
    {
      label: PATHS_MAP[PATHS.ADMIN_BLOG],
      link: PATHS.ADMIN_BLOG,
      icon: <Book className="size-4" />,
      breadcrumbs: [PATHS.ADMIN_HOME, PATHS.ADMIN_BLOG],
    },
    {
      label: PATHS_MAP[PATHS.ADMIN_SNIPPET],
      link: PATHS.ADMIN_SNIPPET,
      icon: <CodeXml className="size-4" />,
      breadcrumbs: [PATHS.ADMIN_HOME, PATHS.ADMIN_SNIPPET],
    },
    {
      label: PATHS_MAP[PATHS.ADMIN_NOTE],
      link: PATHS.ADMIN_NOTE,
      icon: <ScrollIcon className="size-4" />,
      breadcrumbs: [PATHS.ADMIN_HOME, PATHS.ADMIN_NOTE],
    },
    {
      label: PATHS_MAP[PATHS.ADMIN_BLOG_CREATE],
      link: PATHS.ADMIN_BLOG_CREATE,
      breadcrumbs: [PATHS.ADMIN_HOME, PATHS.ADMIN_BLOG, PATHS.ADMIN_BLOG_CREATE],
      hidden: true,
    },
    {
      label: PATHS_MAP[PATHS.ADMIN_BLOG_EDIT],
      link: PATHS.ADMIN_BLOG_EDIT,
      breadcrumbs: [PATHS.ADMIN_HOME, PATHS.ADMIN_BLOG, PATHS.ADMIN_BLOG_EDIT],
      hidden: true,
    },
    {
      label: PATHS_MAP[PATHS.ADMIN_SNIPPET_CREATE],
      link: PATHS.ADMIN_SNIPPET_CREATE,
      breadcrumbs: [
        PATHS.ADMIN_HOME,
        PATHS.ADMIN_SNIPPET,
        PATHS.ADMIN_SNIPPET_CREATE,
      ],
      hidden: true,
    },
    {
      label: PATHS_MAP[PATHS.ADMIN_BLOG_EDIT],
      link: PATHS.ADMIN_BLOG_EDIT,
      breadcrumbs: [PATHS.ADMIN_HOME, PATHS.ADMIN_SNIPPET, PATHS.ADMIN_BLOG_EDIT],
      hidden: true,
    },
  ];

export const AdminLayout = ({ children }: React.PropsWithChildren) => {
  const { user } = useAuth();
  const [signOutDialogOpen, setSignOutDialogOpen] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const pathname = usePathname();
  const { setTheme } = useTheme();

  return (
    <div className="relative flex flex-col min-h-screen overflow-x-hidden">
      <header className="sticky inset-x-0 top-0 z-20 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-16 items-center px-4 md:px-6">
          {/* Logo 区域 - 移动端优化 */}
          <Link href={PATHS.SITE_HOME} className="flex items-center space-x-2 mr-4">
            <img src={ImageAssets.logo} className="size-8 rounded border" alt={WEBSITE} />
            <div className="flex flex-col">
              <span className="text-sm font-bold leading-none">{WEBSITE}</span>
              <span className="text-xs text-muted-foreground leading-none">Admin</span>
            </div>
          </Link>

          {/* 桌面端导航 */}
          <nav className="hidden md:flex flex-1 items-center space-x-2 lg:space-x-4 ml-6">
            {adminNavItems
              .filter((el) => !el.hidden)
              .map((el) => (
                <Link
                  key={el.link}
                  href={el.link}
                  className={cn(
                    "flex items-center space-x-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    "hover:bg-accent hover:text-accent-foreground",
                    pathname === el.link
                      ? "bg-accent text-accent-foreground"
                      : "text-muted-foreground"
                  )}
                >
                  {el.icon}
                  <span className="hidden lg:inline">{el.label}</span>
                </Link>
              ))}
          </nav>

          {/* 右侧操作区域 */}
          <div className="flex items-center space-x-2 ml-auto">
            {/* 主题切换按钮 */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn(
                    "rounded-lg hover:bg-accent/50",
                    "transition-all duration-200",
                    "focus:ring-2 focus:ring-primary/20"
                  )}
                >
                  <Sun
                    className={cn(
                      "size-4 scale-100 rotate-0 transition-all",
                      "dark:scale-0 dark:-rotate-90 dark:hidden"
                    )}
                  />
                  <Moon
                    className={cn(
                      "absolute size-4 scale-0 rotate-90 transition-all",
                      "dark:scale-100 dark:rotate-0 dark:relative"
                    )}
                  />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className={cn(
                  "rounded-lg border-0",
                  "bg-background/95 backdrop-blur-sm",
                  "shadow-lg shadow-black/5"
                )}
              >
                <DropdownMenuItem
                  className="cursor-pointer rounded-md"
                  onClick={() => setTheme("light")}
                >
                  <Sun className="size-4 mr-2" />
                  浅色
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="cursor-pointer rounded-md"
                  onClick={() => setTheme("dark")}
                >
                  <Moon className="size-4 mr-2" />
                  深色
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="cursor-pointer rounded-md"
                  onClick={() => setTheme("system")}
                >
                  <Monitor className="size-4 mr-2" />
                  跟随系统
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* 移动端菜单按钮 */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden"
                  aria-label="打开菜单"
                >
                  <Menu className="size-5" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="left"
                className="w-[280px] p-0 [&>button]:hidden"
              >
                <SheetTitle className="sr-only">管理后台导航菜单</SheetTitle>
                {/* 移动端菜单头部 */}
                <div className="flex items-center justify-between p-4 border-b">
                  <div className="flex items-center space-x-2">
                    <img src={ImageAssets.logo} className="size-8 rounded border" alt={WEBSITE} />
                    <div className="flex flex-col">
                      <span className="text-sm font-bold leading-none">{WEBSITE}</span>
                      <span className="text-xs text-muted-foreground leading-none">Admin Dashboard</span>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setMobileMenuOpen(false)}
                    className="size-8"
                  >
                    <X className="size-4" />
                  </Button>
                </div>

                {/* 移动端导航菜单 */}
                <nav className="flex flex-col p-4 space-y-2">
                  {adminNavItems
                    .filter((el) => !el.hidden)
                    .map((el) => (
                      <Link
                        key={el.link}
                        href={el.link}
                        onClick={() => setMobileMenuOpen(false)}
                        className={cn(
                          "flex items-center space-x-3 rounded-lg px-3 py-3 text-sm font-medium transition-colors",
                          "hover:bg-accent hover:text-accent-foreground",
                          pathname === el.link
                            ? "bg-accent text-accent-foreground"
                            : "text-muted-foreground"
                        )}
                      >
                        {el.icon}
                        <span>{el.label}</span>
                      </Link>
                    ))}
                </nav>
              </SheetContent>
            </Sheet>

            {/* 用户菜单 - 重新设计 */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className={cn(
                    "relative size-10 rounded-xl p-0",
                    "hover:bg-accent/50 hover:scale-105",
                    "transition-all duration-200 ease-in-out",
                    "focus:ring-2 focus:ring-primary/20 focus:ring-offset-2"
                  )}
                >
                  <div className="relative">
                    <Avatar className="size-9 rounded-xl border-2 border-background shadow-sm">
                      <AvatarImage
                        src=""
                        alt={user?.name ?? PLACEHOLDER_TEXT}
                        className="rounded-xl"
                      />
                      <AvatarFallback className="rounded-xl text-xs font-semibold bg-gradient-to-br from-primary/10 to-accent/10">
                        {(user?.name ?? "U").charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    {/* 在线状态指示器 */}
                    <div className="absolute -bottom-0.5 -right-0.5 size-3 bg-green-500 border-2 border-background rounded-full"></div>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className={cn(
                  "w-64 rounded-xl border-0 p-0",
                  "bg-background/95 backdrop-blur-sm",
                  "shadow-lg shadow-black/5",
                  "animate-in slide-in-from-top-2 duration-200"
                )}
                side="bottom"
                align="end"
                sideOffset={8}
              >
                {/* 用户信息头部 */}
                <div className="relative overflow-hidden rounded-t-xl">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10" />
                  <DropdownMenuLabel className="relative p-0 font-normal">
                    <div className="flex items-center gap-3 p-4">
                      <Avatar className="size-12 rounded-xl border-2 border-background/50 shadow-sm">
                        <AvatarImage
                          src=""
                          alt={user?.name ?? PLACEHOLDER_TEXT}
                          className="rounded-xl"
                        />
                        <AvatarFallback className="rounded-xl text-sm font-bold bg-gradient-to-br from-primary/20 to-accent/20">
                          {(user?.name ?? "U").charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-foreground truncate">
                          {user?.name ?? PLACEHOLDER_TEXT}
                        </div>
                        <div className="text-xs text-muted-foreground truncate mt-0.5">
                          {user?.address ?? PLACEHOLDER_TEXT}
                        </div>
                        <div className="text-xs text-green-600 mt-1 flex items-center gap-1">
                          <div className="size-1.5 bg-green-500 rounded-full"></div>
                          在线
                        </div>
                      </div>
                    </div>
                  </DropdownMenuLabel>
                </div>

                <DropdownMenuSeparator className="bg-border/50" />

                {/* 菜单项 */}
                <div className="p-1">
                  <DropdownMenuItem
                    className={cn(
                      "cursor-pointer rounded-lg px-3 py-2.5 text-sm",
                      "text-red-600 hover:text-red-700",
                      "hover:bg-red-50 dark:hover:bg-red-950/20",
                      "focus:bg-red-50 dark:focus:bg-red-950/20",
                      "transition-colors duration-150"
                    )}
                    onClick={() => {
                      setSignOutDialogOpen(true);
                    }}
                  >
                    <LogOut className="size-4 mr-2" />
                    退出登录
                  </DropdownMenuItem>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>
      <main className="flex-1 overflow-x-hidden">{children}</main>

      <SignOutDialog open={signOutDialogOpen} setOpen={setSignOutDialogOpen} />
    </div>
  );
};
