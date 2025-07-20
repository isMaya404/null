import { createBrowserRouter } from "react-router";

import Root from "./pages/Root.tsx";
import Home from "./pages/home/Home.tsx";
import About from "./pages/About.tsx";
// import AuthLayout from "./pages/auth/Layout.tsx";
// import Login from "./pages/auth/Login.tsx";
// import Register from "./pages/auth/Register.tsx";
// import ConcertsHome from "./pages/concerts/Index.tsx";
// import ConcertsCity from "./pages/concerts/City.tsx";
// import ConcertsTrending from "./pages/concerts/Trending.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: "about", Component: About },
      // {
      //   path: "auth",
      //   Component: AuthLayout,
      //   children: [
      //     { path: "login", Component: Login },
      //     { path: "register", Component: Register },
      //   ],
      // },
      // {
      //   path: "concerts",
      //   children: [
      //     { index: true, Component: ConcertsHome },
      //     { path: ":city", Component: ConcertsCity },
      //     { path: "trending", Component: ConcertsTrending },
      //   ],
      // },
    ],
  },
]);

export default router;
