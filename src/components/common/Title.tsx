import { Flex, Text } from "@mantine/core";

interface ITitleProps {
  title: string;
}

export const Title = ({ title }: ITitleProps) => {
  return (
    <>
      <Flex
        direction={{ base: "column", sm: "row" }}
        gap={{ base: "sm", sm: "xl" }}
        justify={{ base: "center", sm: "flex-start" }}
        wrap="wrap"
        mb={40}
      >
        <Text style={{ fontSize: "24px" }}>{title}</Text>
      </Flex>
    </>
  );
};
