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
import { useUserUpdatePasswordMutation } from "../../generated/graphql";
import { HandleToastMessage } from "./types";

interface InitialValues {
  password: string;
  passwordConfirmation: string;
}

const ChangePasswordForm: React.FC<{
  handleToastMessage: HandleToastMessage;
}> = ({ handleToastMessage }) => {
  const [userUpdatePassword] = useUserUpdatePasswordMutation();

  const validationSchema = yup.object().shape({
    password: yup
      .string()
      .min(3, "New Password must be at least 3 characters")
      .max(64)
      .required("New Password is required"),
    passwordConfirmation: yup
      .string()
      .min(3, "Confirm Password must be at least 3 characters")
      .max(64)
      .required("Confirm Password is required")
      .oneOf([yup.ref("password")], "Passwords do not match"),
  });

  const formik: FormikProps<InitialValues> = useFormik<InitialValues>({
    initialValues: { password: "", passwordConfirmation: "" },
    validationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        const { data } = await userUpdatePassword({
          variables: values,
        });

        if (data?.userUpdatePassword) {
          setSubmitting(false);
          resetForm();
          handleToastMessage(
            "Changed Password",
            "Successfully changed password!",
            "success"
          );
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
          isInvalid={
            (formik.errors.password && formik.touched.password) as boolean
          }
        >
          <FormLabel htmlFor="password">New Password</FormLabel>
          <Input
            type="password"
            id="password"
            name="password"
            onChange={formik.handleChange}
            value={formik.values.password}
          />
          <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
        </FormControl>
        <FormControl
          mt={6}
          isInvalid={
            (formik.errors.passwordConfirmation &&
              formik.touched.passwordConfirmation) as boolean
          }
        >
          <FormLabel htmlFor="passwordConfirmation">Confirm Password</FormLabel>
          <Input
            type="password"
            id="passwordConfirmation"
            name="passwordConfirmation"
            onChange={formik.handleChange}
            value={formik.values.passwordConfirmation}
          />
          <FormErrorMessage>
            {formik.errors.passwordConfirmation}
          </FormErrorMessage>
        </FormControl>
        <Stack direction="row" spacing={4} align="center" mt={6}>
          <Button
            colorScheme="green"
            isLoading={formik.isSubmitting}
            type="submit"
          >
            Update
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default ChangePasswordForm;
