import { PropsWithChildren } from "react";

import { Layout as LayoutComponent } from "antd";

export function Layout({ children }: PropsWithChildren) {
  return (
    <LayoutComponent
      style={{
        overflow: "hidden",
        height: "100vh",
        padding: 64,
      }}
    >
      {children}
    </LayoutComponent>
  );
}
