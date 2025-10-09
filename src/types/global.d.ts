import { AnilistMediaQuery } from "@/lib/anilist/gql/graphql";
import {
    MediaSeason,
    MediaFormat,
    MediaStatus,
} from "@/lib/anilist/gql/graphql";

declare global {
    type NonNullableMedia = NonNullable<
        NonNullable<NonNullable<AnilistMediaQuery["Page"]>["media"]>[number]
    >;

    type Filters = {
        // mediaType: string;
        search?: string;
        genres?: string[];
        tags?: string[];
        year?: string;
        season?: MediaSeason;
        format?: MediaFormat[];
        airingStatus?: MediaStatus;
    };

    type ArrayFilterKeys = {
        [K in keyof Filters]: Exclude<Filters[K], undefined> extends any[]
            ? K
            : never;
    }[keyof Filters];
}
