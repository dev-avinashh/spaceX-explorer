import { useQuery } from "@tanstack/react-query";
import { FC, useEffect, useMemo, useState } from "react";
import { IRocket } from "./rockets.interface";
import { rocketsResponse } from "./rockets.services";
import { Flex, Pagination, Text, TextInput } from "@mantine/core";
import { RocketsCard } from "../../components/cards/RocketsCard";
import { Loading } from "../../components/loading/Loading";
import { useDebouncedValue } from "@mantine/hooks";
import { Title } from "../../components/common/Title";
import { EmptyState } from "../../components/common/EmptyState";

const Rockets: FC = () => {
  const {
    data: rockets,
    isLoading: rocketsLoading,
    error,
  } = useQuery<IRocket[]>({
    queryKey: ["rockets"],
    queryFn: rocketsResponse(),
  });
  const [activePage, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebouncedValue(search, 700);

  const [searchLoading, setSearchLoading] = useState(false);

  useEffect(() => {
    setSearchLoading(search !== debouncedSearch);
  }, [search, debouncedSearch]);

  const loading = debouncedSearch.length > 0 ? searchLoading : rocketsLoading;

  // handling search in frontend as no key available for handling from backend
  const filteredRockets = useMemo(() => {
    if (!rockets) return [];
    if (!debouncedSearch.trim()) return rockets;

    const searchQuery = debouncedSearch.toLowerCase().trim();
    return rockets.filter((rocket) =>
      rocket.rocket_name.toLowerCase().includes(searchQuery)
    );
  }, [debouncedSearch, rockets]);

  const pagePerContent = 4;
  const totalPages = Math.ceil(filteredRockets.length / pagePerContent);
  const initialPageValue = (activePage - 1) * pagePerContent;
  const finalPageValue = activePage * pagePerContent;

  if (error)
    return <div>Error loading rockets: {(error as Error).message}</div>;

  return (
    <>
      <Title title="Rockets used by SpaceX" />
      <Flex
        mb={60}
        mr={100}
        direction={{ base: "column", sm: "row" }}
        gap={{ base: "sm", sm: "lg" }}
        justify={{ sm: "flex-start" }}
        wrap="wrap"
      >
        <TextInput
          placeholder="Search by rocket name"
          value={search}
          onChange={(event) => setSearch(event.currentTarget.value)}
          w={400}
          style={{ border: "1px solid grey", color: "black" }}
        />
      </Flex>

      <Flex
        direction={{ base: "column", sm: "row" }}
        gap={{ base: "sm", sm: "lg" }}
        justify={{ sm: "center" }}
        wrap="wrap"
      >
        {filteredRockets?.length === 0 && !loading && (
          <EmptyState
            onReset={() => {
              setSearch("");
            }}
          />
        )}
      </Flex>

      <Flex
        direction={{ base: "column", sm: "row" }}
        gap={{ base: "sm", sm: "lg" }}
        justify={{ base: "center", sm: "flex-start" }}
        wrap="wrap"
      >
        {loading ? (
          <>
            <Loading count={pagePerContent} />
          </>
        ) : (
          filteredRockets &&
          filteredRockets.length > 0 &&
          filteredRockets
            .slice(initialPageValue, finalPageValue)
            .map((rocket, index) => (
              <div key={index}>
                <RocketsCard rocket={rocket} />
              </div>
            ))
        )}
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
