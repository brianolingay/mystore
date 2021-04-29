import { useApolloClient } from "@apollo/client";
import { Container } from "next/app";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useUserLogoutMutation } from "../../generated/graphql";
import { removeCredentials } from "../../lib/credentials";
import Loading from "../../ui/Loading";

const LogoutPage = () => {
  const client = useApolloClient();
  const [userLogout] = useUserLogoutMutation();
  const router = useRouter();

  useEffect(() => {
    userLogout().then(() => {
      removeCredentials();
      client.resetStore().then(() => {
        router.replace("/");
      });
    });
  }, [userLogout, router, client]);

  return (
    <Container>
      <Loading />
    </Container>
  );
};

export default LogoutPage;
