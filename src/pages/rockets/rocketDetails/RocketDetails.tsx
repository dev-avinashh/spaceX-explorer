import {
  Card,
  Text,
  Group,
  Stack,
  Image,
  Divider,
  Grid,
  Container,
  UnstyledButton,
} from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { getRocketDetails } from "../rockets.services";
import { DetailsPageLoading } from "../../../components/loading/DetailsPageLoading";

const RocketDetails = () => {
  const { rocketId } = useParams<{ rocketId: string | undefined }>();
  const navigate = useNavigate();

  const { data, isLoading, error } = useQuery({
    queryKey: ["rocketDetails"],
    queryFn: () => getRocketDetails(rocketId),
    enabled: !!rocketId,
  });
  if (isLoading) return <DetailsPageLoading />;

  if (error) return <div>Error fetching data</div>;

  return (
    <Container fluid>
      <UnstyledButton mb={40} onClick={() => navigate(-1)}>
        ← Back to rockets
      </UnstyledButton>
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

        <Grid.Col xs={12} md={8}>
          <Card shadow="sm" padding="lg" radius="md" withBorder>
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
              <Text size="sm">Engine Type : {data.engines.type}</Text>
              <Text size="sm">Engine Version : {data.engines.version}</Text>
            </Stack>
          </Card>
        </Grid.Col>
      </Grid>
    </Container>
  );
};

export default RocketDetails;
