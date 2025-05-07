import { Button, Paper, PasswordInput, Text, TextInput } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useEffect, useState } from "react";
import { useAuthStore } from "../../store/auth.store";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const isMobile = useMediaQuery("(max-width: 600px)");

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
    <Paper
      withBorder
      shadow="md"
      p={30}
      mt={70}
      radius="md"
      sx={{
        width: isMobile ? "300px" : "500px",
        height: isMobile ? "370px" : "320px",
      }}
    >
      <Text size="xs" mb={2}>
        Email
      </Text>
      <TextInput
        placeholder="you@gmail.com"
        autoFocus
        required
        mb={20}
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <Text size="xs">Password</Text>
      <PasswordInput
        style={{ border: "1px solid grey", color: "black" }}
        placeholder="Your password"
        required
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      {error && (
        <Text color="red" size="sm" mt="sm">
          {error}
        </Text>
      )}
      <Button className="login-btn" onClick={handleSubmit} fullWidth mt={40}>
        Sign in
      </Button>
    </Paper>
  );
};
