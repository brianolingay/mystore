import { useApolloClient } from "@apollo/client";
import { IconButton } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { MdExitToApp } from "react-icons/md";
import { useUserLogoutMutation } from "../generated/graphql";
import { removeCredentials } from "../lib/credentials";

const LogoutButton = () => {
  const router = useRouter();
  const client = useApolloClient();
  const [userLogout] = useUserLogoutMutation();

  return (
    <IconButton
      ml={2}
      aria-label="Logout"
      variant="ghost"
      icon={<MdExitToApp />}
      fontSize="25px"
      onClick={async (e) => {
        e.preventDefault();
        await userLogout();
        removeCredentials();
        await client.clearStore();
        router.replace("/login");
      }}
    />
  );
};

export default LogoutButton;
