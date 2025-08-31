import { Sun, Moon, Computer } from "lucide-react";
import { useState, useEffect } from "react";

type Theme = "light" | "dark" | "system";

export default function ModeToggle() {
    const [selectedTheme, setSelectedTheme] = useState("system");

    useEffect(() => {
        const stored = localStorage.getItem("theme") as Theme | null;
        setSelectedTheme(stored ?? "system");
    }, []);

    const handleChange = (mode: Theme) => {
        setSelectedTheme(mode);
        localStorage.setItem("theme", mode);

        if (mode === "system") {
            const prefersDark = window.matchMedia(
                "(prefers-color-scheme: dark)",
            );
            const preferredTheme = prefersDark.matches ? "dark" : "light";
            document.documentElement.setAttribute("data-theme", preferredTheme);
        } else {
            document.documentElement.setAttribute("data-theme", mode);
        }
    };

    return (
        <div className="cursor-default select-none outline-none transition-colors p-1 mt-2 flex gap-2 w-fit border border-ring rounded-full">
            {(["light", "dark", "system"] as Theme[]).map((mode) => {
                const Icon =
                    mode === "light" ? Sun : mode === "dark" ? Moon : Computer;
                return (
                    <label
                        key={mode}
                        className={`cursor-pointer rounded-full p-1 border transition-colors duration-200 ${
                            selectedTheme === mode
                                ? "border-ring"
                                : "border-transparent"
                        }`}
                    >
                        <input
                            type="radio"
                            name="theme"
                            value={mode}
                            checked={selectedTheme === mode}
                            onChange={() => handleChange(mode)}
                            className="hidden"
                        />
                        <Icon className="h-4 w-4" />
                    </label>
                );
            })}
        </div>
    );
}
