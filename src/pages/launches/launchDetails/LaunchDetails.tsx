import React from "react";
import {
  Card,
  Text,
  Badge,
  Group,
  Stack,
  Image,
  Divider,
  Grid,
  Container,
  UnstyledButton,
} from "@mantine/core";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getSingleLaunchData } from "../launches.services";
import { DetailsPageLoading } from "../../../components/loading/DetailsPageLoading";

export const LaunchDetails = () => {
  const { launchId } = useParams<{ launchId: string | any }>();
  const navigate = useNavigate();

  const { data, isLoading, error } = useQuery({
    queryKey: ["launch", launchId],
    queryFn: () => getSingleLaunchData(launchId),
    enabled: !!launchId,
  });

  if (isLoading) return <DetailsPageLoading />;
  if (error) return <div>Error fetching data</div>;

  return (
    <Container fluid>
      <UnstyledButton mb={40} onClick={() => navigate(-1)}>
        ← Back to launches
      </UnstyledButton>
      <Grid>
        <Grid.Col xs={12} md={4}>
          <Card shadow="sm" padding="lg" radius="md" mih={480} withBorder>
            <Card.Section>
              <Image
                src={data.links.mission_patch}
                height={360}
                alt="mission_image"
                w="auto"
                fit="contain"
                py={10}
              />
            </Card.Section>
            <Divider my="md" />

            <Text fw={700} size={30} mb={10} mt={40}>
              {data.mission_name}
            </Text>
            <Group>
              <Text fw={700}>Launch Year:</Text> :
              <Text fw={500}> {data.launch_year}</Text>
            </Group>
            <Group>
              <Text fw={700}> Launch Window:</Text>

              <Text fw={500}> {data.launch_window}</Text>
            </Group>
            <Group>
              <Text fw={700}> Rocket Name: </Text>

              <Text fw={500}> {data.rocket.rocket_name}</Text>
            </Group>
          </Card>
        </Grid.Col>

        {/* Right panel */}
        <Grid.Col xs={12} md={8}>
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Group position="apart">
              <Group>
                <Badge color="teal" variant="light">
                  Active
                </Badge>
              </Group>
            </Group>

            <Text size="xl" weight={600} mt="md" mb="sm">
              About {data.mission_name}
            </Text>
            <Text size="sm">
              {data.details && data.details.length > 500
                ? `${data.details.slice(0, 500)}...`
                : data.details || "No mission details available."}{" "}
            </Text>

            <Divider my="md" />

            <Text size="lg" weight={600} mb="sm">
              Details
            </Text>

            <Stack spacing="xs">
              <Group spacing="xs">
                {data.ships && data.ships.length > 0 && (
                  <>
                    <Text size="sm">Ships Used:</Text>
                    {data.ships.map((ship: string, index: number) => (
                      <Text key={index} size="sm">
                        {ship}
                      </Text>
                    ))}
                  </>
                )}
              </Group>
              <Text size="sm">
                Launch Site Name : {data.launch_site.site_name_long}
              </Text>
              {data.telemetry && data.telemetry.flight_club && (
                <>
                  <Text size="sm">
                    Flight Club Name : {data.telemetry.flight_club}
                  </Text>
                </>
              )}
            </Stack>
          </Card>
        </Grid.Col>
      </Grid>
    </Container>
  );
};
