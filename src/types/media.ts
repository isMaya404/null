import type { HomePageQuery } from "@/lib/anilist/gql/graphql";

export type PopularMedia = NonNullable<
  NonNullable<NonNullable<HomePageQuery["popular"]>["media"]>[number]
>;

export type TrendingMedia = NonNullable<
  NonNullable<NonNullable<HomePageQuery["trending"]>["media"]>[number]
>;
