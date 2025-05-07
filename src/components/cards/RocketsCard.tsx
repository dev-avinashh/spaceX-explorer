import {
  Card,
  Image,
  Text,
  Badge,
  Button,
  Group,
  Progress,
  Box,
} from "@mantine/core";
import { IRocket } from "../../pages/rockets/rockets.interface";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "@mantine/hooks";

interface IRocketCardsProps {
  rocket: IRocket;
}

export const RocketsCard = ({ rocket }: IRocketCardsProps) => {
  const isMobile = useMediaQuery("(max-width: 600px)");

  const navigate = useNavigate();

  const viewDetailsHandler = (rocketId: string) => {
    navigate(`/dashboard/rockets/${rocketId}`);
  };
  return (
    <>
      <Card
        shadow="sm"
        padding="lg"
        radius="md"
        withBorder
        sx={{
          width: isMobile ? "300px" : "370px",
          height: isMobile ? "400px" : "390px",
        }}
        style={{ position: "relative" }}
      >
        <Card.Section>
          <Image src={rocket?.flickr_images[0]} height={160} alt="Norway" />
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
        <Box
          style={{
            position: "absolute",
            bottom: "20px",
            left: "0",
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Button
            color="blue"
            fullWidth
            mt="md"
            radius="md"
            sx={{
              width: isMobile ? "270px" : "320px",
            }}
            onClick={() => viewDetailsHandler(rocket.rocket_id)}
          >
            View Details
          </Button>
        </Box>
      </Card>
    </>
  );
};
