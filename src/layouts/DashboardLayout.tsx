import { FC, ReactNode } from "react";
import { NavLink, Outlet } from "react-router-dom";
import {
  AppShell,
  Navbar,
  Header,
  Text,
  Group,
  ThemeIcon,
  Box,
  ScrollArea,
  UnstyledButton,
  Stack,
} from "@mantine/core";
import {
  IconRocket,
  IconUser,
  IconSettings,
  IconCalendarEvent,
  IconPackage,
  IconLogout,
} from "@tabler/icons-react";
import { useAuthStore } from "../store/auth.store";

interface INavItem {
  label: string;
  icon: ReactNode;
  path: string;
}

const navItems: INavItem[] = [
  {
    label: "Launches",
    icon: <IconCalendarEvent size={18} />,
    path: "/dashboard/launches",
  },
  {
    label: "Rockets",
    icon: <IconRocket size={18} />,
    path: "/dashboard/rockets",
  },
];

const DashboardLayout: FC = () => {
  const logout = useAuthStore((state) => state.logout);

  return (
    <AppShell
      padding="md"
      navbar={
        <Navbar width={{ base: 240 }} p="xs">
          <Navbar.Section>
            <Text fw={700} fz="lg" mb="md">
              🚀 SpaceX Explorer
            </Text>
          </Navbar.Section>
          <Navbar.Section grow component={ScrollArea}>
            <Stack>
              {navItems.map((item) => (
                <NavLink
                  key={item.label}
                  to={item.path}
                  style={{ textDecoration: "none" }}
                >
                  {({ isActive }) => (
                    <UnstyledButton
                      px="sm"
                      py="xs"
                      style={{
                        borderRadius: 6,
                        backgroundColor: isActive ? "#d0ebff" : "transparent", // light blue
                        color: isActive ? "#1c7ed6" : "#333", // dark blue if active
                        fontWeight: 600,
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                      }}
                    >
                      <ThemeIcon
                        variant="light"
                        color={isActive ? "blue" : "gray"}
                      >
                        {item.icon}
                      </ThemeIcon>
                      {item.label}
                    </UnstyledButton>
                  )}
                </NavLink>
              ))}
            </Stack>
          </Navbar.Section>
          <Navbar.Section>
            <UnstyledButton
              onClick={logout}
              px="sm"
              py="xs"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                borderRadius: 6,
                fontWeight: 500,
              }}
            >
              <ThemeIcon variant="light" color="red">
                <IconLogout size={18} />
              </ThemeIcon>
              Logout
            </UnstyledButton>
          </Navbar.Section>
        </Navbar>
      }
      header={
        <Header
          height={60}
          px="md"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text fw={600}>SpaceX Launch Dashboard</Text>
          <Text size="sm" color="gray">
            v1.0.0
          </Text>
        </Header>
      }
    >
      <Box>
        <Outlet />
      </Box>
    </AppShell>
  );
};

export default DashboardLayout;
