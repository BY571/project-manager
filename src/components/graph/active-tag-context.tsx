"use client";

import { createContext, useContext } from "react";

interface ActiveTagContextValue {
  activeTagId: string | null;
}

export const ActiveTagContext = createContext<ActiveTagContextValue>({
  activeTagId: null,
});

export function useActiveTag() {
  return useContext(ActiveTagContext);
}
