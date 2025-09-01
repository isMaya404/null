import { Sun, Moon, Computer } from "lucide-react";
import { useTheme } from "@/contexts/theme";

type Theme = "light" | "dark" | "system";

export default function ModeToggle() {
    const { theme, setTheme } = useTheme();

    const handleChange = (mode: Theme) => {
        setTheme(mode);
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
                            theme === mode
                                ? "border-ring"
                                : "border-transparent"
                        }`}
                    >
                        <input
                            type="radio"
                            name="theme"
                            value={mode}
                            checked={theme === mode}
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
