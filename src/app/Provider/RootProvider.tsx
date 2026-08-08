"use client";

import { ThemeProvider } from "next-themes";
import { ReactNode, useRef } from "react";

import { Provider } from "react-redux";
import { makeStore } from "../store";
import { RootState } from "../store/index";

const ReduxProvider = ({ children }: { children: ReactNode }) => {
  // here
  // const storeRef = useRef<null | RootState>(null);

  // if (!storeRef.current) storeRef.current = makeStore();

  return (
    // <Provider store={storeRef.current}>
    <ThemeProvider attribute={"class"} enableSystem defaultTheme="system">
      {children}
    </ThemeProvider>
    // </Provider>
  );
};

export default ReduxProvider;
