import { Credential } from "../generated/graphql";
import isServer from "../utils/isServer";

const itemKey = "credentials";

export const getCredentials = () => {
  if (!isServer()) {
    const credentials = localStorage.getItem(itemKey);

    if (credentials) {
      const { accessToken, client, expiry, tokenType, uid } = JSON.parse(
        credentials
      );
      return {
        accessToken,
        client,
        expiry,
        tokenType,
        uid,
        loggedIn: true,
      };
    }
  }

  return {
    accessToken: "",
    client: "",
    expiry: "",
    tokenType: "",
    uid: "",
    loggedIn: false,
  };
};
export const setCredentials = (credentials: Credential) =>
  localStorage.setItem(itemKey, JSON.stringify(credentials));

export const removeCredentials = () => localStorage.removeItem(itemKey);
