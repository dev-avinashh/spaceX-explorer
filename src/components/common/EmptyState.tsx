import { Box, Text, Stack, Button, ThemeIcon, Center } from "@mantine/core";
import { IconSearch, IconRefresh } from "@tabler/icons-react";

interface NoDataFoundProps {
  icon?: React.ReactNode;
  resetButtonLabel?: string;
  onReset?: () => void;
  showResetButton?: boolean;
}

export const EmptyState = ({
  icon = <IconSearch size={48} />,
  resetButtonLabel = "Clear Filters",
  onReset,
  showResetButton = true,
}: NoDataFoundProps) => {
  return (
    <Box
      py={50}
      px={20}
      sx={(theme) => ({
        borderRadius: theme.radius.md,
        backgroundColor: theme.colors.gray[0],
        textAlign: "center",
        width: "100%",
      })}
    >
      <Center>
        <Stack spacing="md" align="center" sx={{ maxWidth: 400 }}>
          <ThemeIcon size={80} radius={80} color="gray">
            {icon}
          </ThemeIcon>

          <Text size="xl" weight={600}>
            No Results Found
          </Text>
          <Text size="sm" color="dimmed">
            We couldn't find any matching results for your search criteria
          </Text>

          {showResetButton && onReset && (
            <Button
              leftIcon={<IconRefresh size={16} />}
              variant="light"
              onClick={onReset}
              mt="md"
            >
              {resetButtonLabel}
            </Button>
          )}
        </Stack>
      </Center>
    </Box>
  );
};
