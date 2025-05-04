import {
  Card,
  Image,
  Text,
  Badge,
  Button,
  Group,
  Progress,
  Chip,
} from "@mantine/core";
import { IRockets } from "../../pages/rockets/rockets.interface";

interface IRocketCardsProps {
  rocket: IRockets;
}

export const RocketsCard = ({ rocket }: IRocketCardsProps) => {
  return (
    <>
      <Card shadow="sm" padding="lg" radius="md" withBorder maw={350}>
        <Card.Section>
          <Image
            src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png"
            height={160}
            alt="Norway"
          />
        </Card.Section>

        <Group
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
          mt="md"
          mb="xs"
        >
          <Text fw={500}>{rocket.rocket_name}</Text>
          <Badge
            size="xs"
            variant="filled"
            color={rocket.active ? "green" : "gray"}
          >
            {rocket.active ? "Active" : "In-active"}
          </Badge>
        </Group>

        <Text size="sm" c="dimmed">
          {rocket.description && rocket.description.length > 40
            ? `${rocket.description.slice(0, 40)}...`
            : rocket.description || "No rocket description available."}{" "}
        </Text>

        <Text
          size="sm"
          c="red"
          mt={30}
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div>Success Rate</div>

          <div>{rocket.success_rate_pct}</div>
        </Text>
        <Progress value={rocket.success_rate_pct} />

        <Button color="blue" fullWidth mt="md" radius="md">
          View Details
        </Button>
      </Card>
    </>
  );
};
