import { AnilistMediaQuery } from "@/lib/anilist/gql/graphql";

declare global {
    type NonNullableMedia = NonNullable<
        NonNullable<NonNullable<AnilistMediaQuery["Page"]>["media"]>[number]
    >;
}
