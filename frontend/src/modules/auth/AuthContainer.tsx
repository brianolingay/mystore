import Router from "next/router";
import { useEffect } from "react";
import { getCredentials } from "../../lib/credentials";

const AuthContainer: React.FC = ({ children }) => {
  const { loggedIn } = getCredentials();
  useEffect(() => {
    if (!loggedIn) {
      Router.replace("/login");
    }
  }, []);

  if (!loggedIn) return null;

  return <>{children}</>;
};

export default AuthContainer;
