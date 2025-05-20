"use client";

interface TGlobalContext {
  projects: Project[];
}

const GlobalContext = React.createContext<TGlobalContext>({
  projects: [],
});

import type { Project } from "@/lib/types";
import React from "react";

interface GlobalProviderProps {
  projects: Project[];
  children: React.ReactNode;
}

export function GlobalProvider({ projects, children }: GlobalProviderProps) {
  return (
    <GlobalContext.Provider value={{ projects }}>
      {children}
    </GlobalContext.Provider>
  );
}

export function useGlobal() {
  const ctx = React.useContext(GlobalContext);

  if (!ctx) throw new Error("useGlobal must be used within a GlobalProvider");

  return ctx;
}
