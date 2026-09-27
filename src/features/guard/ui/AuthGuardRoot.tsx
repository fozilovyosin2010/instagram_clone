"use client";

import { ReactNode } from "react";

import { LoadingUI } from "@/src/shared/components";
import { useAuthGuard } from "@/src/features/guard/hooks/useAuthGuard";

export const AuthGuardRoot = ({ children }: { children: ReactNode }) => {
  const { authStatus } = useAuthGuard();

  if (authStatus === "checking" || authStatus === "unauthorised")
    return <LoadingUI />;

  return <>{children}</>;
};

export default AuthGuardRoot;
