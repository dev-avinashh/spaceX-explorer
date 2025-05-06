import { FC, useEffect, useState } from "react";
import { Cards } from "../../components/cards/Cards";
import { Container, Flex, Pagination, Select, TextInput } from "@mantine/core";
import {
  getLaunchDataByFilter,
  launchResponseData,
  searchByRocketName,
} from "./launches.services";
import { useQuery } from "@tanstack/react-query";
import { ILaunch } from "./launches.interface";
import { Loading } from "../../components/loading/Loading";
import { useDebouncedValue } from "@mantine/hooks";
import { Title } from "../../components/common/Title";
import { EmptyState } from "../../components/common/EmptyState";

const Launches: FC = () => {
  const [activePage, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");
  const [debouncedSearch] = useDebouncedValue(search, 700);
  const [launchFilter, setLaunchFilter] = useState<string | null>("");

  // query for handling all launches data
  const {
    data: launches,
    isLoading: allLaunchLoading,
    error: allLaunchError,
  } = useQuery<ILaunch[]>({
    queryKey: ["launches"],
    queryFn: launchResponseData(),
  });

  // query for handling searched launches data
  const {
    data: searchedLaunches,
    isLoading: searchedLoading,
    error: searchedError,
  } = useQuery<ILaunch[]>({
    queryKey: [debouncedSearch, "debouncedSearch"],
    queryFn: () => searchByRocketName(debouncedSearch),
    enabled: debouncedSearch.length > 0,
  });

  // query for handling filters
  const {
    data: filteredLaunchedData,
    isLoading: filteredLaunchDataLoading,
    error: filteredLaunchDataError,
  } = useQuery<ILaunch[]>({
    queryKey: [launchFilter, "filter"],
    queryFn: () => getLaunchDataByFilter(launchFilter),
    enabled: !!launchFilter,
  });

  // For turing the active page 1 as any search or filter gets triggered
  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, launchFilter]);

  // determining launch data
  const launchData =
    search.length > 0
      ? searchedLaunches
      : launchFilter
      ? filteredLaunchedData
      : launches;

  // determining launch loading state
  const launchLoading =
    search.length > 0
      ? searchedLoading
      : launchFilter
      ? filteredLaunchDataLoading
      : allLaunchLoading;

  // determining launch error state
  const launchError =
    search.length > 0
      ? searchedError
      : launchFilter
      ? filteredLaunchDataError
      : allLaunchError;
  const dataPerPage = 12;
  const totalPages = launchData
    ? Math.ceil(launchData.length / dataPerPage)
    : 0;
  const initialPageValue = (activePage - 1) * dataPerPage;
  const finalPageValue = activePage * dataPerPage;

  if (launchError) return <div>Error loading launches</div>;

  return (
    <Container fluid>
      <Title title="Launches Done By SpaceX" />
      <Flex
        mb={60}
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

        <Select
          placeholder="Filter Launches"
          data={["past", "upcoming"]}
          value={launchFilter}
          onChange={setLaunchFilter}
          clearable
          style={{ border: "1px solid grey", color: "black" }}
        />
      </Flex>

      <Flex
        direction={{ base: "column", sm: "row" }}
        gap={{ base: "sm", sm: "lg" }}
        justify={{ base: "center", sm: "flex-start" }}
        wrap="wrap"
      >
        {launchData?.length === 0 && !launchLoading && (
          <EmptyState
            onReset={() => {
              setSearch("");
              setLaunchFilter("");
            }}
          />
        )}
        {launchLoading ? (
          <>
            <Loading count={dataPerPage} />
          </>
        ) : (
          launchData &&
          launchData?.length > 0 &&
          launchData
            .slice(initialPageValue, finalPageValue)
            .map((launch, index) => (
              <div key={index}>
                <Cards launch={launch} />
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
        {launchData && launchData?.length > 8 && (
          <Pagination
            value={activePage}
            onChange={setPage}
            total={totalPages}
          />
        )}
      </Flex>
    </Container>
  );
};

export default Launches;
