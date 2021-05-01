import { Box, Stack, Flex, Heading, IconButton } from "@chakra-ui/react";
import React from "react";
import { MdEdit } from "react-icons/md";

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

export default PanelComponent;
