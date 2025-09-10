import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // 检查是否是访问后台页面
  if (request.nextUrl.pathname.startsWith("/admin")) {
    // 检查是否有认证 token（这里简化处理，实际项目中可能需要更复杂的验证）
    const authUser = request.cookies.get("solana-auth-user");

    if (!authUser) {
      // 未登录，重定向到登录页面
      return NextResponse.redirect(new URL("/auth/sign-in", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/admin/:path*",
};
