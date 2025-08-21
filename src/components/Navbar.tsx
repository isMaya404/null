import { useEffect, useState } from "react";
import { CircleUser } from "lucide-react";
import { Menu } from "lucide-react";
import { Search as SearchIcon } from "lucide-react";
import { Button } from "@/lib/ui/shadcn/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/lib/ui/shadcn/dropdown-menu";

const Search = () => {
    return (
        <Button variant="minimal" size="auto">
            <SearchIcon />
        </Button>
    );
};

const MenuBtn = () => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="minimal" size="auto">
                    <Menu />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                className="bg-sec z-[999]"
                sideOffset={15}
                align="start"
            >
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Billing</DropdownMenuItem>
                <DropdownMenuItem>Team</DropdownMenuItem>
                <DropdownMenuItem>Subscription</DropdownMenuItem>
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Billing</DropdownMenuItem>
                <DropdownMenuItem>Team</DropdownMenuItem>
                <DropdownMenuItem>Subscription</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

function Nav() {
    const [hidden, setHidden] = useState(false);
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentY = window.scrollY;
            setHidden(currentY > lastScrollY && currentY > 30);
            setLastScrollY(currentY);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, [lastScrollY]);

    return (
        <div
            style={{
                transform: hidden
                    ? "translateY(calc(-100% - 0.75rem))"
                    : "translateY(0)",
            }}
            className={`fixed top-4 right-[50%] z-[500] flex h-14 w-[min(90%,1800px)] translate-x-1/2 items-center justify-between rounded-md bg-prim-dark/80 px-3 text-white transition-transform duration-400 dark:border`}
        >
            <div className="flex items-center gap-4">
                <MenuBtn />

                <div className="cursor-pointer font-extrabold">Null</div>
            </div>
            <div className="flex items-center gap-4">
                {/* <button aria-label="Search" className="cursor-pointer"> */}
                {/*   <Search size={20} /> */}
                {/* </button> */}
                <Search />

                <button aria-label="User" className="cursor-pointer">
                    <CircleUser size={20} />
                </button>
            </div>
        </div>
    );
}

export default Nav;
