import { createYoga } from "graphql-yoga";
import { schema } from "./src/graphql/users/index";

const yoga = createYoga({
schema: schema()
});

const server = Bun.serve({
  fetch: yoga,
});

console.info(
  `Server is running on ${new URL(
    yoga.graphqlEndpoint,
    `http://${server.hostname}:${server.port}`
  )}`
);
