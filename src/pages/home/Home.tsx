import PersistSuspense from "@/components/PersistSuspense";
import { Skeleton } from "@/components/ui/skeleton";
import Hero from "./ui/hero/Hero";
import CardsSection from "./ui/cards/CardsSection";
import CardSectionSkeleton from "./ui/skeleton/CardSectionSkeleton";
import Nav from "@/components/Navbar";

const Home = () => {
    return (
        <div className="flex-1">
            <Nav />

            <PersistSuspense
                fallback={<Skeleton className="w-full h-72 mb-20" />}
            >
                <Hero />
            </PersistSuspense>

            <PersistSuspense fallback={<CardSectionSkeleton />}>
                <CardsSection />
            </PersistSuspense>
        </div>
    );
};

export default Home;
