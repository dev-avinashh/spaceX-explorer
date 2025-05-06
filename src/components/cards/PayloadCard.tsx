import {
  Card,
  Image,
  Text,
  Badge,
  Button,
  Group,
  Flex,
  Box,
} from "@mantine/core";
import { IPayload } from "../../pages/payloads/Payloads.interface";

interface IPayloadProps {
  data: IPayload;
}
export const PayloadCard = ({ data }: IPayloadProps) => {
  return (
    <Card
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
      w={370}
      h={280}
      style={{ position: "relative" }}
    >
      <Card.Section>
        <Image
          src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png"
          height={160}
          alt="Norway"
        />
      </Card.Section>

      <Group mt="md" mb="xs" position="apart">
        <Text fw={500}>
          {data.payload_id.length > 15
            ? data.payload_id.slice(0, 15) + "..."
            : data.payload_id}
        </Text>
        <Badge color="pink">{data.nationality}</Badge>
      </Group>

      <Text size="sm" c="dimmed">
        Manufacturer: {data.manufacturer || "Unknown"}{" "}
      </Text>
      <Text size="sm" c="dimmed">
        Payload Mass:{" "}
        {data.payload_mass_kg ? `${data.payload_mass_kg} kg` : "Not specified"}
      </Text>
    </Card>
  );
};
