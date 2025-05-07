import {
  Anchor,
  Box,
  Button,
  Card,
  Divider,
  Group,
  List,
  Text,
  ThemeIcon,
  Title,
} from "@mantine/core";
import { personalInfo } from "../../staticData/data";
import {
  IconBrandAws,
  IconBrandCss3,
  IconBrandGithub,
  IconBrandHtml5,
  IconBrandJavascript,
  IconBrandLinkedin,
  IconBrandNextjs,
  IconBrandReact,
  IconBrandTypescript,
  IconBrandVue,
  IconCheck,
  IconDownload,
} from "@tabler/icons-react";

export const AboutMeCard = () => {
  return (
    <Card withBorder shadow="sm" p="lg" radius="md">
      <Card.Section p="md" pb="xs" sx={{ textAlign: "center" }}>
        <Title order={3} mt="md">
          {personalInfo.name}
        </Title>
        <Text c="dimmed" size="sm">
          {personalInfo.title}
        </Text>

        <Group position="center" mt="md">
          <Anchor href={personalInfo.github} target="_blank">
            <ThemeIcon size="lg" radius="xl" variant="light">
              <IconBrandGithub size={18} />
            </ThemeIcon>
          </Anchor>
          <Anchor href={personalInfo.linkedin} target="_blank">
            <ThemeIcon size="lg" radius="xl" variant="light">
              <IconBrandLinkedin size={18} />
            </ThemeIcon>
          </Anchor>
        </Group>

        <Group position="center" spacing="xs" mt="md">
          <ThemeIcon size="md" radius="xl" variant="light">
            <IconBrandReact size={16} />
          </ThemeIcon>
          <ThemeIcon size="md" radius="xl" variant="light">
            <IconBrandVue size={16} />
          </ThemeIcon>
          <ThemeIcon size="md" radius="xl" variant="light">
            <IconBrandNextjs size={16} />
          </ThemeIcon>
          <ThemeIcon size="md" radius="xl" variant="light">
            <IconBrandHtml5 size={16} />
          </ThemeIcon>
          <ThemeIcon size="md" radius="xl" variant="light">
            <IconBrandCss3 size={16} />
          </ThemeIcon>
          <ThemeIcon size="md" radius="xl" variant="light">
            <IconBrandJavascript size={16} />
          </ThemeIcon>
          <ThemeIcon size="md" radius="xl" variant="light">
            <IconBrandTypescript size={16} />
          </ThemeIcon>
          <ThemeIcon size="md" radius="xl" variant="light">
            <IconBrandAws size={16} />
          </ThemeIcon>
        </Group>
      </Card.Section>

      <Divider my="sm" />

      <Text size="sm" mt="md">
        {personalInfo.shortBio}
      </Text>

      <Text size="sm" mt="md">
        {personalInfo.longBio}
      </Text>

      <Box mt="xl">
        <Text weight={500} size="sm" mb="md">
          Key Achievements:
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
          {personalInfo.achievements.map((achievement, index) => (
            <List.Item key={index}>{achievement}</List.Item>
          ))}
        </List>
      </Box>

      <Button
        variant="filled"
        color="blue"
        fullWidth
        mt="xl"
        component="a"
        target="_blank"
        href={personalInfo.resumeLink}
      >
        View Resume
      </Button>
    </Card>
  );
};
