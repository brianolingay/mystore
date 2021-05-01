import { Box, Flex } from "@chakra-ui/layout";

const Loading = ({ message = "Loading..." }) => (
  <Flex
    minH="100vh"
    direction="column"
    align="center"
    justify="center"
    bg="gray.50"
  >
    <Box
      w={[300, 400, 500]}
      rounded="lg"
      bg="white"
      boxShadow="lg"
      p={[4, 6, 8]}
      justify="center"
    >
      {message}
    </Box>
  </Flex>
);

export default Loading;
