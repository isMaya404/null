import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
    overwrite: true,
    schema: "https://graphql.anilist.co",
    documents: [
        "src/**/*.ts",
        "src/**/*.tsx",
        "src/**/*.gql",
        "src/**/*.graphql",
    ],
    generates: {
        "src/lib/anilist/gql/": {
            preset: "client",
            plugins: [],
        },
        "./graphql.schema.json": {
            plugins: ["introspection"],
        },
    },
};

export default config;
