"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export const ToggleBtn = () => {
  const { theme, setTheme } = useTheme();

  const [mount, setMount] = useState(false);

  useEffect(() => {
    setMount(true);
  }, []);

  if (!mount) return;

  function hanToggle() {
    setTheme(theme === "dark" ? "light" : "dark");
    // setTheme("dark");
  }

  return (
    <button
      className="border p-[12px_15px] rounded-md bg-[#ddd] shadow-2xl dark:bg-[#fff] dark:text-black dark:shadow-[0_0_0_5px_#fff]"
      onClick={hanToggle}
    >
      {theme === "dark" ? "light" : "dark"}
    </button>
  );
};
