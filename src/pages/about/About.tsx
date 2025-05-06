import { Container, Flex, Grid, Text, Title } from "@mantine/core";

import { AboutMeCard } from "../../components/cards/AboutMeCard";
import { ProjectDetailsCard } from "../../components/cards/ProjectDetailsCard";

export default function About() {
  return (
    <Container fluid size="xl" py="xl">
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
