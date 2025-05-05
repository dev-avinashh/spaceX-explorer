import { Card, Image, Text, Badge, Button, Group, Flex } from "@mantine/core";
import { IPayload } from "../../pages/payloads/Payloads.interface";

interface IPayloadProps {
  data: IPayload;
}
export const PayloadCard = ({ data }: IPayloadProps) => {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder w={350}>
      <Card.Section>
        <Image
          src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png"
          height={160}
          alt="Norway"
        />
      </Card.Section>

      <Group mt="md" mb="xs">
        <Flex
          direction={{ base: "column", sm: "row" }}
          gap={{ base: "sm", sm: "lg" }}
          justify={{ sm: "center", base:"space-around" }}
          wrap="wrap"
        >
          <Text fw={500}>{data.payload_id}</Text>
          <Badge color="pink">{data.nationality}</Badge>
        </Flex>
      </Group>

      <Text size="sm" c="dimmed">
        Manufacturer: {data.manufacturer}
      </Text>
      <Text size="sm" c="dimmed">
        Payload Mass: {data.payload_mass_kg}
      </Text>

      <Button color="blue" fullWidth mt="md" radius="md">
        View Details
      </Button>
    </Card>
  );
};
