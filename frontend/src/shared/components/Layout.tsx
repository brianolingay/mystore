import { Box, Container } from "@chakra-ui/layout";
import { ReactElement } from "react";
import Navigation from "../../ui/Navigation";

const Layout: React.FC = ({ children }) => {
  return (
    <Container maxW="container.lg">
      <Navigation />
      <Box p={4}>{children}</Box>
    </Container>
  );
};

export default Layout;
