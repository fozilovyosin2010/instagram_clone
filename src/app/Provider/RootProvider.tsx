"use client";

import { ThemeProvider } from "next-themes";
import { ReactNode, useRef } from "react";

import { Provider } from "react-redux";
import { makeStore, AppStore } from "../store/index";

const ReduxProvider = ({ children }: { children: ReactNode }) => {
  const storeRef = useRef<null | AppStore>(null);

  if (!storeRef.current) storeRef.current = makeStore();

  return (
    <Provider store={storeRef.current}>
      <ThemeProvider attribute={"class"} enableSystem defaultTheme="system">
        {children}
      </ThemeProvider>
    </Provider>
  );
};

export default ReduxProvider;
