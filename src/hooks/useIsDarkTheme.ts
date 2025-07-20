import { useEffect, useState } from "react";

const useIsDarkTheme = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const root = document.documentElement;

    const updateTheme = () => {
      setIsDark(root.getAttribute("data-theme") === "dark");
    };

    updateTheme(); // initial read

    const observer = new MutationObserver(updateTheme);
    observer.observe(root, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => observer.disconnect();
  }, []);

  return isDark;
};

export default useIsDarkTheme;
