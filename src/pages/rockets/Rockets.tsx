import { useQuery } from "@tanstack/react-query";
import { FC, useMemo, useState } from "react";
import { IRockets } from "./rockets.interface";
import { rocketsResponse } from "./rockets.services";
import { Flex, Pagination, TextInput } from "@mantine/core";
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
  const [search, setSearch] = useState("");

  // handling search in frontend as no key available for handling from backend
  const filteredRockets = useMemo(() => {
    if (!rockets) return [];
    if (!search.trim()) return rockets;

    const searchQuery = search.toLowerCase().trim();
    return rockets.filter((rocket) =>
      rocket.rocket_name.toLowerCase().includes(searchQuery)
    );
  }, [search, rockets]);

  const pagePerContent = 4;
  const totalPages = Math.ceil(filteredRockets.length / pagePerContent);
  const initialPageValue = (activePage - 1) * pagePerContent;
  const finalPageValue = activePage * pagePerContent;

  if (error)
    return <div>Error loading rockets: {(error as Error).message}</div>;

  return (
    <>
      <Flex
        mb={60}
        mr={100}
        direction={{ base: "column", sm: "row" }}
        gap={{ base: "sm", sm: "lg" }}
        justify={{ sm: "flex-end" }}
        wrap="wrap"
      >
        <TextInput
          placeholder="Search by rocket name"
          value={search}
          onChange={(event) => setSearch(event.currentTarget.value)}
          w={400}
        />
      </Flex>

      <Flex
        direction={{ base: "column", sm: "row" }}
        gap={{ base: "sm", sm: "lg" }}
        justify={{ sm: "center" }}
        wrap="wrap"
      >
        {isLoading && <>Loading rockets...</>}
        {filteredRockets?.length === 0 && <> No Data Found</>}
        {filteredRockets &&
          filteredRockets.length > 0 &&
          filteredRockets
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
