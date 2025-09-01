import { useLayoutEffect, useState } from "react";
import { ThemeContext, type Theme } from "./context";
import type { ReactNode } from "react";

export function ThemeProvider({ children }: { children: ReactNode }) {
    const [theme, setThemeState] = useState<Theme>("system");
    const [isDark, setIsDark] = useState<Boolean>(true);

    const setTheme = (theme: Theme) => {
        const resolvedTheme =
            theme === "system"
                ? window.matchMedia("(prefers-color-scheme: dark)").matches
                    ? "dark"
                    : "light"
                : theme;

        // actualTheme is needed since putting "system" directly in root/html
        // attribute won't work since tailwind or css doesn't know what "system" is.
        document.documentElement.setAttribute("data-theme", resolvedTheme);

        localStorage.setItem("theme", theme);
        setThemeState(theme);
        setIsDark(resolvedTheme === "dark" ? true : false);
    };

    useLayoutEffect(() => {
        const media = window.matchMedia("(prefers-color-scheme: dark)");

        const handler = () => {
            const stored = localStorage.getItem("theme") as Theme | null;
            if (!stored || stored === "system") {
                const resolved = media.matches ? "dark" : "light";
                setTheme("system");
                document.documentElement.setAttribute("data-theme", resolved);
            }
        };

        media.addEventListener("change", handler);
        return () => media.removeEventListener("change", handler);
    }, []);

    return (
        <ThemeContext.Provider value={{ theme, setTheme, isDark }}>
            {children}
        </ThemeContext.Provider>
    );
}
