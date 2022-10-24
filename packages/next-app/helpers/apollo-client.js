import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://api.thegraph.com/subgraphs/name/dayana0425/helloworldsubgraph",
  cache: new InMemoryCache(),
});

export default client;