import { Box, Container, Grid, Skeleton } from "@mantine/core";

export const DetailsPageLoading = () => {
  return (
    <Container fluid>
      <Grid>
        <Grid.Col xs={12} md={4}>
          <Skeleton height={700} mb={10} radius="md" />
        </Grid.Col>
        <Grid.Col xs={12} md={8}>
          <Skeleton height={700} mb={10} radius="md" />
        </Grid.Col>
      </Grid>
    </Container>
  );
};
