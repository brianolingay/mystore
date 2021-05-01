import { Box, Stack } from "@chakra-ui/layout";
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Button,
} from "@chakra-ui/react";
import { FormikProps, useFormik } from "formik";
import * as yup from "yup";
import { useUpdateCurrentUserInfoMutation } from "../../generated/graphql";
import { UserRefetch } from "../../shared/types/userRefetch";
import { HandleToastMessage } from "./types";

interface InitialValues {
  name: string;
  nickname: string;
}

interface AccountInfoFormProps extends UserRefetch {
  initialValues: InitialValues;
  handleToastMessage: HandleToastMessage;
  setEditing: React.Dispatch<React.SetStateAction<boolean>>;
}

const AccountInfoForm: React.FC<AccountInfoFormProps> = ({
  initialValues = { name: "", nickname: "" },
  handleToastMessage,
  setEditing,
  refetch,
}) => {
  const [updateCurrentUserInfo] = useUpdateCurrentUserInfoMutation();

  const validationSchema = yup.object().shape({
    name: yup.string().required("Name is required"),
  });

  const formik: FormikProps<InitialValues> = useFormik<InitialValues>({
    initialValues,
    validationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        const { data } = await updateCurrentUserInfo({
          variables: {
            input: values,
          },
        });

        if (data?.updateCurrentUserInfo) {
          setSubmitting(false);
          resetForm();
          await refetch();
          handleToastMessage(
            "Updated Account Info",
            "Successfully updated your information!",
            "success"
          );
          setEditing(false);
        }
      } catch (error) {
        handleToastMessage("Error", error.message, "error");
        setSubmitting(false);
      }
    },
  });

  return (
    <Box w="sm">
      <form onSubmit={formik.handleSubmit}>
        <FormControl
          mt={6}
          isInvalid={(formik.errors.name && formik.touched.name) as boolean}
        >
          <FormLabel htmlFor="name">Name</FormLabel>
          <Input
            id="name"
            name="name"
            onChange={formik.handleChange}
            value={formik.values.name}
          />
          <FormErrorMessage>{formik.errors.name}</FormErrorMessage>
        </FormControl>
        <FormControl mt={6}>
          <FormLabel htmlFor="nickname">Nickname</FormLabel>
          <Input
            id="nickname"
            name="nickname"
            onChange={formik.handleChange}
            value={formik.values.nickname}
          />
        </FormControl>
        <Stack direction="row" spacing={4} align="center" mt={6}>
          <Button
            colorScheme="green"
            isLoading={formik.isSubmitting}
            type="submit"
          >
            Update
          </Button>
          <Button onClick={() => setEditing(false)}>Cancel</Button>
        </Stack>
      </form>
    </Box>
  );
};

export default AccountInfoForm;
