import { GraphQLClient } from "graphql-request";
import { HomePageDocument } from "@/lib/anilist/gql/graphql";
import type {
    HomePageQuery,
    HomePageQueryVariables,
} from "@/lib/anilist/gql/graphql";

const client = new GraphQLClient("https://graphql.anilist.co");

const fetchHomePageData = async (
    vars: HomePageQueryVariables
): Promise<HomePageQuery> => {
    console.log("fetching home data...");
    const res = await client.request<HomePageQuery, HomePageQueryVariables>(
        HomePageDocument,
        vars
    );
    return res;
};

export default fetchHomePageData;
