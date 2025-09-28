import { GraphQLClient } from "graphql-request";
import {
    AnilistGenreAndTagCollectionDocument,
    AnilistMediaDocument,
} from "@/lib/anilist/gql/graphql";
import type {
    AnilistMediaQuery,
    AnilistMediaQueryVariables,
    AnilistGenreAndTagCollectionQuery,
    AnilistGenreAndTagCollectionQueryVariables,
} from "@/lib/anilist/gql/graphql";

const client = new GraphQLClient("https://graphql.anilist.co");

const getAniListMediaData = async (
    vars: AnilistMediaQueryVariables,
): Promise<AnilistMediaQuery> => {
    console.log("querying media data...");
    const res = await client.request<
        AnilistMediaQuery,
        AnilistMediaQueryVariables
    >(AnilistMediaDocument, vars);
    return res;
};

const getAniListGenreAndTagData =
    async (): Promise<AnilistGenreAndTagCollectionQuery> => {
        console.log("querying genre and tag data...");
        const res = await client.request<AnilistGenreAndTagCollectionQuery>(
            AnilistGenreAndTagCollectionDocument,
        );
        return res;
    };

export { getAniListGenreAndTagData, getAniListMediaData };
