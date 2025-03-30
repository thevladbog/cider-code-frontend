"use client";

import React from "react";

import { QrCode } from "@gravity-ui/icons";
import { AsideHeader } from "@gravity-ui/navigation";

import { Wrapper } from "../Wrapper";

interface AppProps {
  children: React.ReactNode;
}
export const App: React.FC<AppProps> = ({ children }) => {
  return (
    <AsideHeader
      logo={{ icon: QrCode, text: "CIDER [CODE]" }}
      compact={true}
      hideCollapseButton={true}
      renderContent={() => <Wrapper>{children}</Wrapper>}
    />
  );
};
