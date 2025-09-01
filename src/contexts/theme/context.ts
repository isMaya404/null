import { createContext } from "react";

export type Theme = "light" | "dark" | "system";

export type ThemeContextType = {
    theme: Theme;
    setTheme: (theme: Theme) => void;
    isDark: Boolean;
};

export const ThemeContext = createContext<ThemeContextType | undefined>(
    undefined,
);
