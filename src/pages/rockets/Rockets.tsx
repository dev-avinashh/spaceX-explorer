import { useQuery } from "@tanstack/react-query";
import { FC, useState } from "react";
import { IRockets } from "./rockets.interface";
import { rocketsResponse } from "./rockets.services";
import { Flex, Pagination } from "@mantine/core";
import { RocketsCard } from "../../components/cards/RocketsCard";

const Rockets: FC = () => {
  const {
    data: rockets,
    isLoading,
    error,
  } = useQuery<IRockets[]>({
    queryKey: ["rockets"],
    queryFn: rocketsResponse(),
  });
  const [activePage, setPage] = useState(1);

  const pagePerContent = 4;
  const totalPages = rockets ? rockets?.length / pagePerContent : 0;
  const initialPageValue = (activePage - 1) * pagePerContent;
  const finalPageValue = activePage * pagePerContent;

  if (isLoading) return <div>Loading rockets...</div>;
  if (error)
    return <div>Error loading rockets: {(error as Error).message}</div>;

  return (
    <>
      <Flex
        direction={{ base: "column", sm: "row" }}
        gap={{ base: "sm", sm: "lg" }}
        justify={{ sm: "center" }}
        wrap="wrap"
      >
        {rockets &&
          rockets
            .slice(initialPageValue, finalPageValue)
            .map((rocket, index) => (
              <div key={index}>
                <RocketsCard rocket={rocket} />
              </div>
            ))}
      </Flex>
      <Flex
        direction={{ base: "column", sm: "row" }}
        gap={{ base: "sm", sm: "lg" }}
        justify={{ sm: "center" }}
        wrap="wrap"
        mt={70}
      >
        <Pagination value={activePage} onChange={setPage} total={totalPages} />
      </Flex>
    </>
  );
};

export default Rockets;
