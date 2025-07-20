// type Breakpoint = "mobile" | "tablet" | "desktop";
//
// export function useBreakpoint(): Breakpoint {
//   const [breakpoint, setBreakpoint] = useState<Breakpoint>(() => {
//     const width = typeof window !== "undefined" ? window.innerWidth : 0;
//     if (width < 640) return "mobile";
//     if (width < 1024) return "tablet";
//     return "desktop";
//   });
//
//   useEffect(() => {
//     const handler = () => {
//       const width = window.innerWidth;
//       setBreakpoint(
//         width < 640 ? "mobile" : width < 1024 ? "tablet" : "desktop"
//       );
//     };
//     window.addEventListener("resize", handler);
//     handler(); // initialize
//     return () => window.removeEventListener("resize", handler);
//   }, []);
//
// return breakpoint;

// sm	640px	Small devices (phones in landscape, small tablets)
// md	768px	Medium devices (tablets)
// lg	1024px	Large devices (laptops)
// xl	1280px	Extra large (desktop monitors)
// 2xl	1536px	Very large screens (wide desktops, 4K monitors)
