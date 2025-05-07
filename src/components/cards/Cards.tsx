import { Card, Image, Text, Badge, Button, Group, Box } from "@mantine/core";
import { ILaunch } from "../../pages/launches/launches.interface";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "@mantine/hooks";

interface ICardProps {
  launch: ILaunch;
}
export const Cards = ({ launch }: ICardProps) => {
  const isMobile = useMediaQuery("(max-width: 600px)");

  const navigate = useNavigate();
  const viewDetailsHandler = (flight_number: number) => {
    navigate(`/dashboard/launches/${flight_number}`);
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
          height: isMobile ? "370px" : "350px",
        }}
        style={{ position: "relative" }}
      >
        <Card.Section>
          <Image
            src={launch.links.mission_patch}
            height={160}
            alt="mission_image"
            w="auto"
            fit="contain"
            py="sm"
          />
        </Card.Section>

        <Group mt="md" mb="xs" position="apart">
          <Text fw={500}>
            {launch.mission_name} ({launch.rocket.rocket_name}){" "}
          </Text>
          <Badge color="pink">{launch.launch_year}</Badge>
        </Group>

        <Text size="sm" c="dimmed">
          {launch.details && launch.details.length > 35
            ? `${launch.details.slice(0, 35)}...`
            : launch.details || "No mission details available."}{" "}
        </Text>

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
            onClick={() => viewDetailsHandler(launch.flight_number)}
            fullWidth
            mt="md"
            radius="md"
            sx={{
              width: isMobile ? "270px" : "320px",
            }}
          >
            View Details
          </Button>
        </Box>
      </Card>
    </>
  );
};
