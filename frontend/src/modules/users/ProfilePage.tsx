import { Stack } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import React, { useMemo, useState } from "react";
import Layout from "../../shared/components/Layout";
import useUser from "../../shared/hooks/useUser";
import PanelComponent from "../../ui/PanelComponent";
import AuthContainer from "../auth/AuthContainer";
import AccountInfo from "./AccountInfo";
import ChangePasswordForm from "./ChangePasswordForm";
import { HandleToastMessage } from "./types";

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
    <AuthContainer>
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
    </AuthContainer>
  );
};

export default ProfilePage;
