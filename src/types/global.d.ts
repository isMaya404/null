import { AnilistMediaQuery, MediaTag } from "@/lib/anilist/gql/graphql";

declare global {
    type NonNullableMedia = NonNullable<
        NonNullable<NonNullable<AnilistMediaQuery["Page"]>["media"]>[number]
    >;

    interface Filters {
        // mediaType: string;
        search?: string;
        genres?: string[];
        tags?: string[];
        year?: string;
        season?: string;
        format?: string[];
        airingStatus?: string;
    }

    type ArrayFilterKeys = {
        [K in keyof Filters]: Exclude<Filters[K], undefined> extends any[]
            ? K
            : never;
    }[keyof Filters];
}
