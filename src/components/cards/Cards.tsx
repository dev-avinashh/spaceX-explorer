import { Card, Image, Text, Badge, Button, Group } from "@mantine/core";
import { ILaunch } from "../../pages/launches/launches.interface";

interface ICardProps {
  launch: ILaunch;
}
export const Cards = ({ launch }: ICardProps) => {
  return (
    <>
      <Card shadow="sm" padding="lg" radius="md" withBorder miw={350}>
        <Card.Section>
          <Image
            src={launch.links.mission_patch}
            height={160}
            alt="mission_image"
            w="auto"
            fit="contain"
          />
        </Card.Section>

        <Group mt="md" mb="xs">
          <Text fw={500}>{launch.mission_name}</Text>
          <Badge color="pink">{launch.launch_year}</Badge>
        </Group>

        <Text size="sm" c="dimmed">
          {launch.details && launch.details.length > 35
            ? `${launch.details.slice(0, 35)}...`
            : launch.details || "No mission details available."}{" "}
        </Text>

        <Button color="blue" fullWidth mt="md" radius="md">
          View Details
        </Button>
      </Card>
    </>
  );
};
