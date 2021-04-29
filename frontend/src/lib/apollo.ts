import { IncomingMessage, ServerResponse } from "http";
import { useMemo } from "react";
import {
  ApolloClient,
  ApolloLink,
  from,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import env from "../utils/env";
import { getCredentials } from "./credentials";
import isServer from "../utils/isServer";

let apolloClient: ApolloClient<NormalizedCacheObject> | undefined;

export type ResolverContext = {
  req?: IncomingMessage;
  res?: ServerResponse;
};

console.log(env("SCHEMA_URI", "http://localhost:3001/graphql"));

const httpLink = new HttpLink({
  uri: env("SCHEMA_URI", "http://localhost:3001/graphql"),
  credentials: "include",
});

const authMiddleware = new ApolloLink((operation, forward) => {
  const credentials = getCredentials();
  // add the authorization to the headers
  operation.setContext({
    headers: {
      "access-token": credentials.accessToken,
      client: credentials.client,
      expiry: credentials.expiry,
      "token-key": credentials.tokenType,
      uid: credentials.uid,
    },
  });

  return forward(operation);
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );

  if (networkError) console.log(`[Network error]: ${networkError}`);
});

function createApolloClient(_context?: ResolverContext) {
  return new ApolloClient({
    ssrMode: isServer(),
    cache: new InMemoryCache(),
    link: from([authMiddleware, errorLink, httpLink]),
  });
}

export function initializeApollo(
  initialState: any = null,
  // Pages with Next.js data fetching methods, like `getStaticProps`, can send
  // a custom context which will be used by `SchemaLink` to server render pages
  context?: ResolverContext
) {
  const _apolloClient = apolloClient ?? createApolloClient(context);

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // get hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract();

    // Restore the cache using the data passed from
    // getStaticProps/getServerSideProps combined with the existing cached data
    _apolloClient.cache.restore({ ...existingCache, ...initialState });
  }
  // For SSG and SSR always create a new Apollo Client
  if (typeof window === "undefined") return _apolloClient;
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
}

export function useApollo(initialState: any) {
  const store = useMemo(() => initializeApollo(initialState), [initialState]);
  return store;
}
