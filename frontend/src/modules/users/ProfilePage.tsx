import { Box, Heading, Stack } from "@chakra-ui/layout";
import { Flex, IconButton, useToast } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import React, { useCallback, useMemo, useState } from "react";
import { MdEdit } from "react-icons/md";
import Layout from "../../shared/components/Layout";
import useUser from "../../shared/hooks/useUser";
import AccountInfo from "./AccountInfo";
import ChangePasswordForm from "./ChangePasswordForm";
import { HandleToastMessage } from "./types";

interface PanelComponentProps {
  heading: string;
  hasActionButton?: boolean;
  onEdit?: () => void;
}

const PanelComponent: React.FC<PanelComponentProps> = ({
  heading,
  hasActionButton = false,
  onEdit,
  children,
}) => (
  <Box p={5} shadow="md" borderWidth="1px" borderRadius="lg" overflow="hidden">
    <Stack spacing="4">
      <Box>
        <Flex
          borderBottom={1}
          borderStyle="solid"
          borderColor="gray.200"
          align="center"
        >
          <Flex flex={{ base: 1 }} justify="start">
            <Heading fontSize="xl">{heading}</Heading>
          </Flex>

          {hasActionButton && (
            <Stack
              flex={{ base: 1, md: 0 }}
              justify="flex-end"
              direction="row"
              spacing={6}
            >
              <IconButton
                variant="ghost"
                colorScheme="teal"
                aria-label="Call Sage"
                fontSize="20px"
                icon={<MdEdit />}
                onClick={onEdit}
              />
            </Stack>
          )}
        </Flex>
      </Box>
      {children}
    </Stack>
  </Box>
);

const AccountInfoForm = dynamic(() => import("./AccountInfoForm"));

const ProfilePage = () => {
  const { me, refetch } = useUser({});
  const toast = useToast();
  const [editing, setEditing] = useState<boolean>(false);

  const handleToastMessage: HandleToastMessage = (title, description, status) =>
    toast({
      title,
      description,
      status,
      position: "top",
      duration: 9000,
      isClosable: true,
    });

  const userInfo = useMemo(
    () => ({
      name: me?.name || "",
      nickname: me?.nickname || "",
    }),
    [me]
  );

  return (
    <Layout>
      <Stack spacing="4">
        <PanelComponent
          heading="Account Info"
          hasActionButton={!editing}
          onEdit={() => setEditing(true)}
        >
          {!editing ? (
            <AccountInfo me={me} />
          ) : (
            <AccountInfoForm
              initialValues={userInfo}
              handleToastMessage={handleToastMessage}
              setEditing={setEditing}
              refetch={refetch}
            />
          )}
        </PanelComponent>
        <PanelComponent heading="Change Password">
          <ChangePasswordForm handleToastMessage={handleToastMessage} />
        </PanelComponent>
      </Stack>
    </Layout>
  );
};

export default ProfilePage;
