import { User } from "../../generated/graphql";

export interface AccountInfoProps {
  me:
    | ({
        __typename?: "User" | undefined;
      } & {
        __typename?: "User" | undefined;
      } & Pick<User, "id" | "email" | "name" | "nickname" | "image">)
    | undefined;
}
