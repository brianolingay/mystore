import {
  Flex,
  Box,
  Text,
  Stack,
  Link,
  useColorModeValue,
  useBreakpointValue,
} from "@chakra-ui/react";

import useUser from "../shared/hooks/useUser";

interface MenuItemProps {
  label: string;
  href: string;
}

const MenuItem: React.FC<MenuItemProps> = ({ label, href }) => (
  <Box>
    <Link
      p={2}
      href={href ?? "#"}
      fontSize="sm"
      fontWeight={500}
      color={useColorModeValue("gray.600", "gray.200")}
      _hover={{
        textDecoration: "none",
        color: useColorModeValue("gray.800", "white"),
      }}
    >
      {label}
    </Link>
  </Box>
);

const Navigation = () => {
  const { me } = useUser({});
  return (
    <Box>
      <Flex
        bg={useColorModeValue("white", "gray.800")}
        color={useColorModeValue("gray.600", "white")}
        minH="60px"
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle="solid"
        borderColor={useColorModeValue("gray.200", "gray.900")}
        align="center"
      >
        <Flex flex={{ base: 1 }} justify="start">
          <Text
            textAlign={useBreakpointValue({ base: "center", md: "left" })}
            fontFamily="heading"
            color={useColorModeValue("gray.800", "white")}
          >
            Logo
          </Text>

          {me && (
            <Flex display="flex" ml={10}>
              <Stack direction="row" spacing={4}>
                <MenuItem label="Home" href="/" />
                <MenuItem label="Products" href="/products" />
              </Stack>
            </Flex>
          )}
        </Flex>

        <Stack
          flex={{ base: 1, md: 0 }}
          justify="flex-end"
          direction="row"
          spacing={6}
        >
          {me ? (
            <>
              <MenuItem label="Profile" href="/profile" />
              <MenuItem label="Logout" href="/logout" />
            </>
          ) : (
            <>
              <MenuItem label="Login" href="/login" />
              <MenuItem label="Register" href="/register" />
            </>
          )}
        </Stack>
      </Flex>
    </Box>
  );
};

export default Navigation;
