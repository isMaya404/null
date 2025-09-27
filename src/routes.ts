import { createBrowserRouter, redirect } from "react-router";
import Root from "./pages/Root.tsx";
import Home from "./pages/home/Home.tsx";
import About from "./pages/About.tsx";
import Search from "./pages/search/Search.tsx";
import AnimeSearch from "./pages/search/AnimeSearch.tsx";
import MangaSearch from "./pages/search/MangaSearch.tsx";

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
            {
                path: "search",
                Component: Search,
                children: [
                    // { index: true, Component: AnimeSearch },
                    {
                        index: true,
                        loader: ({ request }) => {
                            const url = new URL(request.url);
                            return redirect(`anime${url.search}`);
                        },
                    },
                    { path: "anime", Component: AnimeSearch },
                    { path: "manga", Component: MangaSearch },
                ],
            },
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
