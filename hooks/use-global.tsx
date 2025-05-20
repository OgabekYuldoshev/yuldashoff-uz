"use client";

import type { Post, Project } from "@/lib/types";
import React from "react";

interface TGlobalContext {
  projects: Project[];
  posts: Post[];
}

const GlobalContext = React.createContext<TGlobalContext>({
  projects: [],
  posts: [],
});

interface GlobalProviderProps {
  projects: Project[];
  posts: Post[];
  children: React.ReactNode;
}

export function GlobalProvider({
  projects,
  children,
  posts,
}: GlobalProviderProps) {
  return (
    <GlobalContext.Provider value={{ projects, posts }}>
      {children}
    </GlobalContext.Provider>
  );
}

export function useGlobal() {
  const ctx = React.useContext(GlobalContext);

  if (!ctx) throw new Error("useGlobal must be used within a GlobalProvider");

  return ctx;
}
