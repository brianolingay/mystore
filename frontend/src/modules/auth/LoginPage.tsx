import { useApolloClient } from "@apollo/client";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  CloseButton,
  Divider,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Stack,
} from "@chakra-ui/react";
import { FormikProps, useFormik } from "formik";
import { useRouter } from "next/router";
import { useState } from "react";
import * as yup from "yup";
import { useUserLoginMutation } from "../../generated/graphql";
import { setCredentials } from "../../lib/credentials";
import { AlertState } from "../../shared/types/formTypes";
import UnAuthContainer from "./UnAuthContainer";

interface InitialValues {
  email: string;
  password: string;
}

const LoginPage = () => {
  const router = useRouter();
  const [userLogin] = useUserLoginMutation();
  const [alert, setAlert] = useState<AlertState | null>(null);

  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .email("Email address is invalid")
      .required("Email address is required"),
    password: yup.string().required("Password is required"),
  });

  const formik: FormikProps<InitialValues> = useFormik<InitialValues>({
    initialValues: { email: "", password: "" },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const { data } = await userLogin({
          variables: values,
        });

        if (data?.userLogin) {
          setCredentials(data.userLogin.credentials!);

          router.replace("/");
        }
      } catch (error) {
        setAlert({
          title: error.message,
          status: "error",
        });
        setSubmitting(false);
      }
    },
  });

  return (
    <UnAuthContainer>
      <Flex
        minH="100vh"
        direction="column"
        align="center"
        justify="center"
        bg="gray.50"
      >
        <Stack spacing={8} mx="auto" maxW="lg" py={12} px={6}>
          <Box
            w={[300, 400, 500]}
            rounded="lg"
            bg="white"
            boxShadow="lg"
            p={[4, 6, 8]}
          >
            <Box overflow="hidden">
              <Heading as="h3" size="lg" mb="15px">
                Login
              </Heading>
              <Divider />
              <Box mt="15px">
                {alert && (
                  <Alert status={alert.status}>
                    <AlertIcon />
                    {alert.title && (
                      <AlertTitle mr={2}>{alert.title}</AlertTitle>
                    )}
                    <CloseButton
                      position="absolute"
                      right="8px"
                      top="8px"
                      onClick={() => setAlert(null)}
                    />
                  </Alert>
                )}
                <form onSubmit={formik.handleSubmit}>
                  <FormControl
                    isInvalid={
                      (formik.errors.email && formik.touched.email) as boolean
                    }
                  >
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <Input
                      type="email"
                      id="email"
                      name="email"
                      onChange={formik.handleChange}
                      value={formik.values.email}
                    />
                    <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
                  </FormControl>
                  <FormControl
                    mt={6}
                    isInvalid={
                      (formik.errors.password &&
                        formik.touched.password) as boolean
                    }
                  >
                    <FormLabel htmlFor="password">Password</FormLabel>
                    <Input
                      type="password"
                      id="password"
                      name="password"
                      onChange={formik.handleChange}
                      value={formik.values.password}
                    />
                    <FormErrorMessage>
                      {formik.errors.password}
                    </FormErrorMessage>
                  </FormControl>
                  <Stack direction="row" spacing={4} align="center" mt={6}>
                    <Button
                      colorScheme="green"
                      isLoading={formik.isSubmitting}
                      type="submit"
                      w="100%"
                    >
                      Submit
                    </Button>
                    {/* <Spacer />
                    <Button
                      colorScheme="blue"
                      variant="link"
                      onClick={() => {
                        router.push("/reset-password");
                      }}
                    >
                      Reset Password
                    </Button> */}
                  </Stack>
                </form>
              </Box>
            </Box>
          </Box>
        </Stack>
      </Flex>
    </UnAuthContainer>
  );
};

export default LoginPage;
