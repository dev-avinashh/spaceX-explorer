import { Container, Flex, Grid, Text, Title } from "@mantine/core";

import { AboutMeCard } from "../../components/cards/AboutMeCard";
import { ProjectDetailsCard } from "../../components/cards/ProjectDetailsCard";

export default function About() {
  return (
    <Container fluid size="xl" py="xl">
      <Flex
        direction={{ base: "column", sm: "row" }}
        gap={{ base: "sm", sm: "xl" }}
        justify={{ base: "center", sm: "flex-start" }}
        wrap="wrap"
        mb={40}
      >
        <Text style={{ fontSize: "24px" }}>About Me & My Projects</Text>
      </Flex>

      <Grid gutter="xl" mb="xl">
        <Grid.Col md={4}>
          <AboutMeCard />
        </Grid.Col>

        <Grid.Col md={8}>
          <ProjectDetailsCard />
        </Grid.Col>
      </Grid>
    </Container>
  );
}
