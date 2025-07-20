(function () {
  const stored = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const theme =
    stored && stored !== "system" ? stored : prefersDark ? "dark" : "light";
  document.documentElement.setAttribute("data-theme", theme);

  const style = document.createElement("style");
  style.textContent = `
    :root {
      --fg: oklch(0.145 0 0); /* dark */
      --prim: oklch(0.985 0 0); /* light */
    }
    [data-theme="dark"] {
      --prim: rgb(3, 7, 18); /* primary */
      --fg: oklch(0.985 0 0);  /* light */
    }
    body {
      background-color: var(--prim);
      color: var(--fg);
    }
  `;
  document.head.appendChild(style);
})();
