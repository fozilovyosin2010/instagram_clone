"use client";

import { ReactNode } from "react";

import { LoadingUI } from "@/src/shared/components";
import { useAuthGuard } from "@/src/features/guard/hooks/hooks";

export const AuthGuardRoot = ({ children }: { children: ReactNode }) => {
  const { isChecking } = useAuthGuard();

  if (isChecking) return <LoadingUI />;
  return <>{children}</>;
};

export default AuthGuardRoot;
