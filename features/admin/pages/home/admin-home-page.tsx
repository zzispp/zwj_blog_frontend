import * as React from "react";

import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";

import { PATHS } from "@/constants";
import { cn } from "@/lib/utils";

export const AdminHomePage = () => {
  const guessList: { label: string; link: string }[] = [
    { label: "创建标签", link: PATHS.ADMIN_TAG },
    { label: "创建博客", link: PATHS.ADMIN_BLOG },
    { label: "创建片段", link: PATHS.ADMIN_SNIPPET },
    { label: "创建笔记", link: PATHS.ADMIN_NOTE },
  ];

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4">
      <div className="w-full max-w-2xl text-center space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl md:text-3xl font-medium">欢迎使用后台管理系统</h2>
          <p className="text-base md:text-lg text-muted-foreground">你可能想 🤔</p>
        </div>

        {/* 响应式按钮布局 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 w-full">
          {guessList.map((el) => (
            <Link
              key={el.link}
              className={cn(
                buttonVariants({ variant: "default" }),
                "w-full py-3 text-sm font-medium"
              )}
              href={el.link}
            >
              {el.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
