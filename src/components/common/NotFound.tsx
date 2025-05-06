import React from "react";
import {
  Container,
  Title,
  Text,
  Button,
  Group,
  Stack,
  Center,
  ThemeIcon,
} from "@mantine/core";
import { IconArrowLeft, IconHome, IconAlertCircle } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

export const NotFound = () => {
  const navigate = useNavigate();

  const goBack = () => navigate(-1);
  const goHome = () => navigate("/");

  return (
    <Container py={50}>
      <Stack align="center" spacing="lg">
        <Center mb={20}>
          <ThemeIcon size="xl" radius="xl" color="blue" variant="light">
            <IconAlertCircle size={32} />
          </ThemeIcon>
        </Center>

        <Title
          order={1}
          size={120}
          align="center"
          sx={(theme) => ({
            color: theme.colors.gray[3],
            fontWeight: 900,
          })}
        >
          404
        </Title>

        <Title order={2} align="center">
          Page Not Found
        </Title>

        <Text color="dimmed" align="center" maw={500} mx="auto">
          The page you are looking for might have been removed or is temporarily
          unavailable. Please check the URL or navigate back to the homepage.
        </Text>

        <Group position="center" mt={30}>
          <Button
            variant="subtle"
            leftIcon={<IconArrowLeft size={16} />}
            onClick={goBack}
          >
            Go Back
          </Button>

          <Button
            variant="filled"
            leftIcon={<IconHome size={16} />}
            onClick={goHome}
          >
            Home
          </Button>
        </Group>
      </Stack>
    </Container>
  );
};
