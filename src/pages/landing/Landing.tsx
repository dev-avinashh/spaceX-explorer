import { FC, useEffect, useState } from "react";
import {
  Button,
  Container,
  Flex,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useAuthStore } from "../../store/auth.store";
import { useNavigate } from "react-router-dom";

const Landing: FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const login = useAuthStore((state) => state.login);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard/launches", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = () => {
    const success = login(email, password);
    if (success) {
      navigate("/dashboard/launches");
    } else {
      setError("Invalid email or password ");
    }
  };

  return (
    <>
      <Container
        size={420}
        my={40}
        style={{
          minHeight: "80vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Flex justify="center" align="center" direction="column">
          <Title ta="center" className="title">
            Welcome to SpaceX Explorer!
          </Title>

          <Paper
            withBorder
            shadow="md"
            p={30}
            mt={70}
            radius="md"
            miw={500}
            mih={320}
          >
            <TextInput
              label="Email"
              placeholder="you@gmial.com"
              autoFocus
              required
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <PasswordInput
              label="Password"
              placeholder="Your password"
              required
              mt="md"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            {error && (
              <Text color="red" size="sm" mt="sm">
                {error}
              </Text>
            )}
            <Button
              className="login-btn"
              onClick={handleSubmit}
              fullWidth
              mt={40}
            >
              Sign in
            </Button>
          </Paper>
        </Flex>
      </Container>
    </>
  );
};

export default Landing;
