"use client";

import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";

export type AuthRole = "startup" | "mentor";

type ModalContextValue = {
  isLoginOpen: boolean;
  role: AuthRole;
  openLogin: (role?: AuthRole) => void;
  closeLogin: () => void;
  setRole: (role: AuthRole) => void;
};

const ModalContext = createContext<ModalContextValue | null>(null);

export function ModalProvider({ children }: { children: ReactNode }) {
  const [isLoginOpen, setLoginOpen] = useState(false);
  const [role, setRole] = useState<AuthRole>("startup");

  const openLogin = useCallback((nextRole: AuthRole = "startup") => {
    setRole(nextRole);
    setLoginOpen(true);
  }, []);

  const closeLogin = useCallback(() => setLoginOpen(false), []);

  return (
    <ModalContext.Provider
      value={{ isLoginOpen, role, openLogin, closeLogin, setRole }}
    >
      {children}
    </ModalContext.Provider>
  );
}

export function useModal() {
  const context = useContext(ModalContext);
  if (!context) throw new Error("useModal must be used inside <ModalProvider>");
  return context;
}
