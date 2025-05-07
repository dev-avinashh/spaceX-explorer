import { Container, Flex, Title } from "@mantine/core";
import { Login } from "../../components/auth/Login";

const Landing = () => {
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
          <Login />
        </Flex>
      </Container>
    </>
  );
};

export default Landing;
