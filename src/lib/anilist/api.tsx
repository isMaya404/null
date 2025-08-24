import { GraphQLClient } from "graphql-request";
import { MediaDocument } from "@/lib/anilist/gql/graphql";
import type {
    MediaQuery,
    MediaQueryVariables,
} from "@/lib/anilist/gql/graphql";

const client = new GraphQLClient("https://graphql.anilist.co");

const AniListMediaData = async (
    vars: MediaQueryVariables,
): Promise<MediaQuery> => {
    console.log("querying data...");
    const res = await client.request<MediaQuery, MediaQueryVariables>(
        MediaDocument,
        vars,
    );
    return res;
};

export default AniListMediaData;
