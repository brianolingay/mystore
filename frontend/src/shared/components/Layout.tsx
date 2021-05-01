import { Box, Container } from "@chakra-ui/layout";
import Loading from "../../ui/Loading";
import Navigation from "../../ui/Navigation";
import useUser from "../hooks/useUser";

const Layout: React.FC = ({ children }) => {
  const { me, loading } = useUser({});

  if (loading) return <Loading />;

  return (
    <Container maxW="container.lg">
      <Navigation me={me} />
      <Box p={4}>{children}</Box>
    </Container>
  );
};

export default Layout;
