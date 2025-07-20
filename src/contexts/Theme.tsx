import { useLayoutEffect, useState, createContext } from "react";
import type { ReactNode } from "react";

export const ThemeContext = createContext<{ theme: string }>({ theme: "dark" });

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState("dark");

  useLayoutEffect(() => {
    const current =
      document.documentElement.getAttribute("data-theme") || "dark";
    setTheme(current);

    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = () => {
      if (!localStorage.getItem("theme")) {
        const newTheme = media.matches ? "dark" : "light";
        document.documentElement.setAttribute("data-theme", newTheme);
        setTheme(newTheme);
      }
    };
    media.addEventListener("change", handler);
    return () => media.removeEventListener("change", handler);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme }}>{children}</ThemeContext.Provider>
  );
}
