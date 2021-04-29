import { Box } from "@chakra-ui/layout";
import { ReactElement } from "react";
import Navigation from "../../ui/Navigation";

const Container: React.FC<{ children: ReactElement }> = ({ children }) => {
  return (
    <>
      <Navigation />
      <Box p={4}>{children}</Box>
    </>
  );
};

export default Container;
