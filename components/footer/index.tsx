import * as React from "react";

import Link from "next/link";

import {
  NICKNAME,
  SLOGAN,
} from "@/constants";

export const Footer = () => {
  return (
    <footer className="px-6 py-12">
      <div
        className={`
          flex flex-col items-center justify-center space-y-4 pt-24 text-sm text-muted-foreground
        `}
      >
        <div className="text-center">
          &copy; {new Date().getFullYear()} {NICKNAME} · GMGN.RS
        </div>
        <div className="text-center max-w-2xl">
          {SLOGAN}
        </div>
      </div>
    </footer>
  );
};
