"use client";
import { useTheme } from "next-themes";

export const ToggleBtn = () => {
  const { theme, setTheme } = useTheme();

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
