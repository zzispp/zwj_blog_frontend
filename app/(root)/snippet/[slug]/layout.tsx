import * as React from "react";

// 移除了generateMetadata，因为我们改为客户端渲染
// 如果需要SEO，可以在组件内使用next/head或其他方式动态设置

export default function Layout({ children }: React.PropsWithChildren) {
  return <>{children}</>;
}
