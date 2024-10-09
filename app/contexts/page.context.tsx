"use client";

import React, { createContext, useContext, useState, useMemo } from "react";

interface PageContextProps {
  isSoundOn: boolean;
  setIsSoundOn: (isSoundOn: boolean) => void;
}

const PageContext = createContext<PageContextProps | null>(null);

export function PageProvider({ children }: { children: React.ReactNode }) {
  const [isSoundOn, setIsSoundOn] = useState<boolean>(true);

  const value = useMemo(
    () => ({
      isSoundOn,
      setIsSoundOn,
    }),
    [isSoundOn, setIsSoundOn]
  );

  return <PageContext.Provider value={value}>{children}</PageContext.Provider>;
}

export const usePageContext = (): PageContextProps => {
  const context = useContext(PageContext);
  if (!context) {
    throw new Error("usePageContext must be used within a PageProvider");
  }
  return context;
};

