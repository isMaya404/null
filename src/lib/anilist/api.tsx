import { GraphQLClient } from "graphql-request";

const client = new GraphQLClient("https://graphql.anilist.co");
import { HomePageDocument } from "@/lib/anilist/gql/graphql";
import type {
  HomePageQuery,
  HomePageQueryVariables,
} from "@/lib/anilist/gql/graphql";

const fetchHomePageData = async (): Promise<HomePageQuery> => {
  console.log("fetching...");
  const res = await client.request<HomePageQuery, HomePageQueryVariables>(
    HomePageDocument,
    { asHtml: true }
  );
  console.log("fetched", res);
  return res;
};

export default fetchHomePageData;
