import { List, ListItem, ListIcon, Text, Skeleton } from "@chakra-ui/react";
import React from "react";
import { MdPermIdentity, MdEmail } from "react-icons/md";
import { User } from "../../generated/graphql";
import { AccountInfoProps } from "../../shared/types/myTypes";

const AccountInfo: React.FC<AccountInfoProps> = ({ me }) => {
  return (
    <List spacing={3}>
      <ListItem display="flex" alignItems="center">
        <ListIcon as={MdPermIdentity} color="gray.500" />
        <Text w="150px" fontWeight="bold">
          Name
        </Text>
        :{" "}
        {me ? <>{me.name}</> : <Skeleton bg="gray.100" w="sm" height="20px" />}
      </ListItem>
      <ListItem display="flex" alignItems="center">
        <ListIcon as={MdPermIdentity} color="gray.500" />
        <Text w="150px" fontWeight="bold">
          Nickname
        </Text>
        :{" "}
        {me ? (
          <>{me.nickname}</>
        ) : (
          <Skeleton bg="gray.100" w="sm" height="20px" />
        )}
      </ListItem>
      <ListItem display="flex" alignItems="center">
        <ListIcon as={MdEmail} color="green.500" />
        <Text w="150px" fontWeight="bold">
          Email Address
        </Text>
        :{" "}
        {me ? <>{me.email}</> : <Skeleton bg="gray.100" w="sm" height="20px" />}
      </ListItem>
    </List>
  );
};

export default AccountInfo;
