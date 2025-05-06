import {
  Badge,
  Box,
  Button,
  Card,
  Divider,
  Grid,
  Group,
  List,
  Text,
  ThemeIcon,
  Title,
} from "@mantine/core";
import { assignmentProjectDetails } from "../../staticData/data";
import {
  IconApi,
  IconBrandGithub,
  IconCheck,
  IconCode,
  IconExternalLink,
} from "@tabler/icons-react";

export const ProjectDetailsCard = () => {
  return (
    <Card withBorder shadow="sm" radius="md" mb="xl">
      <Grid>
        <Grid.Col md={12}>
          <Title order={3}>{assignmentProjectDetails.title}</Title>
          <Text mt="xs" mb="md" size="sm">
            {assignmentProjectDetails.description}
          </Text>

          <Group spacing="xs" mb="xs">
            {assignmentProjectDetails.technologies.map((tech) => (
              <Badge key={tech} size="sm" variant="filled">
                {tech}
              </Badge>
            ))}
          </Group>
          <Divider></Divider>

          <Box mt="md">
            <Text weight={700} size="sm" mb="xs">
              <IconApi size={16} style={{ marginRight: 5 }} /> APIs Used:
            </Text>
            <List
              spacing="xs"
              size="sm"
              icon={
                <ThemeIcon color="blue" size={20} radius="xl">
                  <IconCheck size={12} />
                </ThemeIcon>
              }
            >
              {assignmentProjectDetails.apis.map((api) => (
                <List.Item key={api}>{api}</List.Item>
              ))}
            </List>
          </Box>

          <Box mt="md">
            <Text weight={700} size="sm" mb="xs">
              <IconCode size={16} style={{ marginRight: 5 }} /> Functionality:
            </Text>
            <List
              spacing="xs"
              size="sm"
              icon={
                <ThemeIcon color="green" size={20} radius="xl">
                  <IconCheck size={12} />
                </ThemeIcon>
              }
            >
              {assignmentProjectDetails.features.map((feature) => (
                <List.Item key={feature}>{feature}</List.Item>
              ))}
            </List>
          </Box>

          <Box mt="md">
            <Text weight={700} size="sm" mb="xs">
              <IconExternalLink size={16} style={{ marginRight: 5 }} /> Pages
              Implemented:
            </Text>
            <List
              spacing="xs"
              size="sm"
              icon={
                <ThemeIcon color="violet" size={20} radius="xl">
                  <IconCheck size={12} />
                </ThemeIcon>
              }
            >
              {assignmentProjectDetails.pages.map((page) => (
                <List.Item key={page}>{page}</List.Item>
              ))}
            </List>
          </Box>

          <Group mt="lg">
            <Button
              variant="light"
              leftIcon={<IconBrandGithub size={16} />}
              component="a"
              href={assignmentProjectDetails.github}
              target="_blank"
              size="sm"
            >
              GitHub Repository
            </Button>
          </Group>
        </Grid.Col>
      </Grid>
    </Card>
  );
};
