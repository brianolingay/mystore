import {
  Flex,
  Box,
  Text,
  Stack,
  Link,
  useColorModeValue,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { AccountInfoProps } from "../shared/types/myTypes";
import LogoutButton from "./LogoutButton";

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
      as={NextLink}
    >
      {label}
    </Link>
  </Box>
);

const Navigation: React.FC<AccountInfoProps> = ({ me }) => {
  return (
    <Box>
      <Flex
        color="gray.600"
        minH="60px"
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle="solid"
        borderColor="gray.200"
        align="center"
      >
        <Flex flex={{ base: 1 }} justify="start">
          <Text textAlign="left" fontFamily="heading" color="gray.800">
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
          alignItems="center"
          direction="row"
          spacing={6}
        >
          {me ? (
            <>
              <MenuItem label="Profile" href="/profile" />
              <LogoutButton />
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
