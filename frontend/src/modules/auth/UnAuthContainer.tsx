import Router from "next/router";
import { useEffect } from "react";
import { getCredentials } from "../../lib/credentials";

const UnAuthContainer: React.FC = ({ children }) => {
  const { loggedIn } = getCredentials();
  useEffect(() => {
    if (loggedIn) {
      Router.replace("/");
    }
  }, []);

  if (loggedIn) return null;

  return <>{children}</>;
};

export default UnAuthContainer;
