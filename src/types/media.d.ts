import { AnilistMediaQuery } from "@/lib/anilist/gql/graphql";

export type Media = NonNullable<
    NonNullable<NonNullable<AnilistMediaQuery["Page"]>["media"]>[number]
>;
