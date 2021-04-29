import { ApolloQueryResult } from "@apollo/client";
import { MeQuery, MeQueryVariables } from "../../generated/graphql";

export interface UserRefetch {
  refetch: (
    variables?: MeQueryVariables
  ) => Promise<ApolloQueryResult<MeQuery>>;
}
