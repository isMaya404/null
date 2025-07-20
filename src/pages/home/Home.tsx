import PersistSuspense from "@/components/PersistSuspense";
import { Skeleton } from "@/components/ui/skeleton";
import Hero from "./ui/hero/Hero";
import CardsSection from "./ui/cards/CardsSection";
import Nav from "@/components/Navbar";
import fetchHomePageData from "@/lib/anilist/api";

const Home = () => {
  // function notNull<T>(item: T): item is NonNullable<T> {
  //   return item !== null && item !== undefined;
  // }

  return (
    <div className="flex-1">
      <Nav />
      <PersistSuspense fallback={<Skeleton className="w-full h-72" />}>
        <Hero />
      </PersistSuspense>

      {/* TODO: create a skeleton  */}
      <PersistSuspense fallback={<Skeleton className="" />}>
        <CardsSection />
      </PersistSuspense>
    </div>
  );
};

export default Home;
