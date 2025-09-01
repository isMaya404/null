import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useTheme } from "@/contexts/theme";

const DarkOverlays = () => {
    const isMediumUp = useMediaQuery("(min-width: 640px)");
    const allSize = useMediaQuery("(min-width: 0px)");

    const { isDark } = useTheme();

    return (
        <>
            {isDark && allSize && (
                <div className="hero-gradient-to-top pointer-events-none absolute bottom-0 left-0 z-[11] h-[40%] w-full" />
            )}

            {isMediumUp && (
                <>
                    <div className="hero-gradient-to-right pointer-events-none absolute top-0 left-0 z-[11] h-full w-[60%]" />
                    {isDark && (
                        <div className="hero-gradient-to-left pointer-events-none absolute top-0 right-0 z-[11] h-full w-[10%]" />
                    )}
                </>
            )}
        </>
    );
};

export default DarkOverlays;
