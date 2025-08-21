/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "query HomePage($page: Int, $perPage: Int = 10, $type: MediaType, $search: String, $genre_in: [String], $season: MediaSeason, $seasonYear: Int, $format_in: [MediaFormat], $status_in: [MediaStatus], $sort: [MediaSort]) {\n  Page(page: $page, perPage: $perPage) {\n    media(\n      type: $type\n      search: $search\n      genre_in: $genre_in\n      season: $season\n      seasonYear: $seasonYear\n      format_in: $format_in\n      status_in: $status_in\n      sort: $sort\n      isAdult: false\n    ) {\n      id\n      title {\n        romaji\n        english\n      }\n      coverImage {\n        extraLarge\n      }\n      genres\n      format\n      status\n      bannerImage\n      description(asHtml: true)\n      season\n      seasonYear\n      averageScore\n      popularity\n      episodes\n      studios(isMain: true) {\n        nodes {\n          name\n        }\n      }\n      nextAiringEpisode {\n        airingAt\n        timeUntilAiring\n      }\n    }\n    pageInfo {\n      total\n      perPage\n      currentPage\n      lastPage\n      hasNextPage\n    }\n  }\n  GenreCollection\n  MediaTagCollection {\n    category\n    description\n    id\n    isAdult\n    isGeneralSpoiler\n    isMediaSpoiler\n    name\n    rank\n  }\n}": typeof types.HomePageDocument,
};
const documents: Documents = {
    "query HomePage($page: Int, $perPage: Int = 10, $type: MediaType, $search: String, $genre_in: [String], $season: MediaSeason, $seasonYear: Int, $format_in: [MediaFormat], $status_in: [MediaStatus], $sort: [MediaSort]) {\n  Page(page: $page, perPage: $perPage) {\n    media(\n      type: $type\n      search: $search\n      genre_in: $genre_in\n      season: $season\n      seasonYear: $seasonYear\n      format_in: $format_in\n      status_in: $status_in\n      sort: $sort\n      isAdult: false\n    ) {\n      id\n      title {\n        romaji\n        english\n      }\n      coverImage {\n        extraLarge\n      }\n      genres\n      format\n      status\n      bannerImage\n      description(asHtml: true)\n      season\n      seasonYear\n      averageScore\n      popularity\n      episodes\n      studios(isMain: true) {\n        nodes {\n          name\n        }\n      }\n      nextAiringEpisode {\n        airingAt\n        timeUntilAiring\n      }\n    }\n    pageInfo {\n      total\n      perPage\n      currentPage\n      lastPage\n      hasNextPage\n    }\n  }\n  GenreCollection\n  MediaTagCollection {\n    category\n    description\n    id\n    isAdult\n    isGeneralSpoiler\n    isMediaSpoiler\n    name\n    rank\n  }\n}": types.HomePageDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query HomePage($page: Int, $perPage: Int = 10, $type: MediaType, $search: String, $genre_in: [String], $season: MediaSeason, $seasonYear: Int, $format_in: [MediaFormat], $status_in: [MediaStatus], $sort: [MediaSort]) {\n  Page(page: $page, perPage: $perPage) {\n    media(\n      type: $type\n      search: $search\n      genre_in: $genre_in\n      season: $season\n      seasonYear: $seasonYear\n      format_in: $format_in\n      status_in: $status_in\n      sort: $sort\n      isAdult: false\n    ) {\n      id\n      title {\n        romaji\n        english\n      }\n      coverImage {\n        extraLarge\n      }\n      genres\n      format\n      status\n      bannerImage\n      description(asHtml: true)\n      season\n      seasonYear\n      averageScore\n      popularity\n      episodes\n      studios(isMain: true) {\n        nodes {\n          name\n        }\n      }\n      nextAiringEpisode {\n        airingAt\n        timeUntilAiring\n      }\n    }\n    pageInfo {\n      total\n      perPage\n      currentPage\n      lastPage\n      hasNextPage\n    }\n  }\n  GenreCollection\n  MediaTagCollection {\n    category\n    description\n    id\n    isAdult\n    isGeneralSpoiler\n    isMediaSpoiler\n    name\n    rank\n  }\n}"): (typeof documents)["query HomePage($page: Int, $perPage: Int = 10, $type: MediaType, $search: String, $genre_in: [String], $season: MediaSeason, $seasonYear: Int, $format_in: [MediaFormat], $status_in: [MediaStatus], $sort: [MediaSort]) {\n  Page(page: $page, perPage: $perPage) {\n    media(\n      type: $type\n      search: $search\n      genre_in: $genre_in\n      season: $season\n      seasonYear: $seasonYear\n      format_in: $format_in\n      status_in: $status_in\n      sort: $sort\n      isAdult: false\n    ) {\n      id\n      title {\n        romaji\n        english\n      }\n      coverImage {\n        extraLarge\n      }\n      genres\n      format\n      status\n      bannerImage\n      description(asHtml: true)\n      season\n      seasonYear\n      averageScore\n      popularity\n      episodes\n      studios(isMain: true) {\n        nodes {\n          name\n        }\n      }\n      nextAiringEpisode {\n        airingAt\n        timeUntilAiring\n      }\n    }\n    pageInfo {\n      total\n      perPage\n      currentPage\n      lastPage\n      hasNextPage\n    }\n  }\n  GenreCollection\n  MediaTagCollection {\n    category\n    description\n    id\n    isAdult\n    isGeneralSpoiler\n    isMediaSpoiler\n    name\n    rank\n  }\n}"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;