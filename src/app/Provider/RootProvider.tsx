"use client";

import { ThemeProvider } from "next-themes";
import { ReactNode, useRef } from "react";

import { Provider } from "react-redux";
import { makeStore } from "../store/index";
import { RootState } from "../store/index";
import { AppStore } from "../store/store";

const ReduxProvider = ({ children }: { children: ReactNode }) => {
  // here
  const storeRef = useRef<null | AppStore>(null);

  if (!storeRef.current) storeRef.current = makeStore();

  console.log(storeRef.current);

  return (
    <Provider store={storeRef.current}>
      <ThemeProvider attribute={"class"} enableSystem defaultTheme="system">
        {children}
      </ThemeProvider>
    </Provider>
  );
};

export default ReduxProvider;
