import {
  Card,
  Text,
  Badge,
  Group,
  Stack,
  Image,
  Divider,
  Progress,
  Grid,
  ThemeIcon,
} from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { FC } from "react";
import { useParams } from "react-router-dom";
import { getRocketDetails } from "../rockets.services";
import { IconRocket } from "@tabler/icons-react";

const RocketDetails: FC = () => {
  const { rocketId } = useParams<{ rocketId: string | undefined }>();

  const { data, isLoading, error } = useQuery({
    queryKey: ["rocketDetails"],
    queryFn: () => getRocketDetails(rocketId),
    enabled: !!rocketId,
  });
  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>Error fetching data</div>;

  return (
    <>
      {" "}
      <Grid>
        <Grid.Col xs={12} md={4}>
          <Card shadow="sm" padding="lg" radius="md" mih={480} withBorder>
            <Card.Section>
              <Image
                src={data.flickr_images[0]}
                height={360}
                alt="mission_image"
                w="auto"
                fit="contain"
                py={10}
              />
            </Card.Section>
            <Divider my="md" />

            <Text fw={700} size={30} mb={10} mt={40}>
              {data.rocket_name}
            </Text>
            <Group>
              <Text fw={700}>First Flight Year:</Text> :
              <Text fw={500}> {data.first_flight}</Text>
            </Group>
            <Group>
              <Text fw={700}>Launch Country:</Text> :
              <Text fw={500}> {data.country}</Text>
            </Group>
            <Group>
              <Text fw={700}>Company:</Text> :
              <Text fw={500}> {data.company}</Text>
            </Group>
          </Card>
        </Grid.Col>

        {/* Right panel */}
        <Grid.Col xs={12} md={8}>
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            {/* <Group position="apart">
              <Group>
                <Badge color="teal" variant="light">
                  Active
                </Badge>
              </Group>
            </Group> */}

            <Text size="xl" weight={600} mt="md" mb="sm">
              About {data.rocket_name}
            </Text>
            <Text size="sm">
              {data.description && data.description.length > 500
                ? `${data.description.slice(0, 500)}...`
                : data.description || "No mission details available."}{" "}
            </Text>

            <Divider my="md" />

            <Text size="lg" weight={600} mb="sm">
              Details
            </Text>

            <Stack spacing="xs">
              {/* <Group spacing="xs">
                {data.payload_weights && data.payload_weights.length > 0 && (
                  <>
                    <Text size="sm">Payload Weights:</Text>
                    {data.payload_weights.map((ship: string, index: number) => (
                      <Text key={index} size="sm">
                        {ship?.name}
                      </Text>
                    ))}
                  </>
                )}
              </Group> */}
              <Text size="sm">Engine Type : {data.engines.type}</Text>
              <Text size="sm">Engine Version : {data.engines.version}</Text>
            </Stack>
          </Card>
        </Grid.Col>
      </Grid>{" "}
    </>
  );
};

export default RocketDetails;
