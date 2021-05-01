import { AlertStatus } from "@chakra-ui/alert";

export type HandleToastMessage = (
  title: string,
  description: string,
  status: AlertStatus
) => void;
