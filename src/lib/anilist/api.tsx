import { GraphQLClient } from "graphql-request";
import { AnilistMediaDocument } from "@/lib/anilist/gql/graphql";
import type {
    AnilistMediaQuery,
    AnilistMediaQueryVariables,
} from "@/lib/anilist/gql/graphql";

const client = new GraphQLClient("https://graphql.anilist.co");

const AniListMediaData = async (
    vars: AnilistMediaQueryVariables,
): Promise<AnilistMediaQuery> => {
    console.log("querying data...");
    const res = await client.request<
        AnilistMediaQuery,
        AnilistMediaQueryVariables
    >(AnilistMediaDocument, vars);
    return res;
};

export default AniListMediaData;
