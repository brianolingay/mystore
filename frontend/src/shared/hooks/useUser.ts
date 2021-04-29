import Router from "next/router";
import { useEffect } from "react";
import { useMeQuery } from "../../generated/graphql";

const useUser = ({ redirectTo = "", redirectIfFound = false }) => {
  const { data, loading, refetch } = useMeQuery({ pollInterval: 50000 });
  const me = data?.me;

  useEffect(() => {
    // if no redirect needed, just return (example: already on /dashboard)
    // if user data not yet there (fetch in progress, logged in or not) then don't do anything yet
    if (!redirectTo || loading) return;

    if (
      // If redirectTo is set, redirect if the user was not found.
      (redirectTo && !redirectIfFound && !me?.email) ||
      // If redirectIfFound is also set, redirect if the user was found
      (redirectIfFound && me?.email)
    ) {
      Router.push(redirectTo);
    }
  }, [me, loading, redirectIfFound, redirectTo]);

  return { me, loading, refetch };
};

export default useUser;
