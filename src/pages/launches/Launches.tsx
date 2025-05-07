import { useEffect, useState } from "react";
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
import { useDebouncedValue, useMediaQuery } from "@mantine/hooks";
import { Title } from "../../components/common/Title";
import { EmptyState } from "../../components/common/EmptyState";

const Launches = () => {
  const [activePage, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");
  const [debouncedSearch] = useDebouncedValue(search, 700);
  const [launchFilter, setLaunchFilter] = useState<string | null>("");

  const isMobile = useMediaQuery("(max-width: 600px)");

  const {
    data: launches,
    isLoading: allLaunchLoading,
    error: allLaunchError,
  } = useQuery<ILaunch[]>({
    queryKey: ["launches"],
    queryFn: launchResponseData(),
  });

  const {
    data: searchedLaunches,
    isLoading: searchedLoading,
    error: searchedError,
  } = useQuery<ILaunch[]>({
    queryKey: [debouncedSearch, "debouncedSearch"],
    queryFn: () => searchByRocketName(debouncedSearch),
    enabled: debouncedSearch.length > 0,
  });

  const {
    data: filteredLaunchedData,
    isLoading: filteredLaunchDataLoading,
    error: filteredLaunchDataError,
  } = useQuery<ILaunch[]>({
    queryKey: [launchFilter, "filter"],
    queryFn: () => getLaunchDataByFilter(launchFilter),
    enabled: !!launchFilter,
  });

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, launchFilter]);

  const launchData =
    search.length > 0
      ? searchedLaunches
      : launchFilter
      ? filteredLaunchedData
      : launches;

  const launchLoading =
    search.length > 0
      ? searchedLoading
      : launchFilter
      ? filteredLaunchDataLoading
      : allLaunchLoading;

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
    <Container
      fluid
      px={isMobile ?  0 : ''}
      sx={{
        display: isMobile ? "flex" : "block",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        flexWrap: "wrap",
      }}
    >
      <Title title="Launches Done By SpaceX" />

      <Flex
        mb={60}
        direction={isMobile ? "column" : "row"}
        gap="lg"
        justify={isMobile ? "center" : "flex-start"}
        wrap="wrap"
      >
        <TextInput
          placeholder="Search by rocket name"
          value={search}
          onChange={(event) => setSearch(event.currentTarget.value)}
          miw={300}
          style={{ border: "1px solid grey", color: "black" }}
        />

        <Select
          placeholder="Filter launches"
          data={["past", "upcoming"]}
          value={launchFilter}
          onChange={setLaunchFilter}
          clearable
          miw={300}
          style={{ border: "1px solid grey", color: "black" }}
        />
      </Flex>

      <Flex
        direction={isMobile ? "column" : "row"}
        gap="lg"
        justify={isMobile ? "center" : "flex-start"}
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
          <Loading count={dataPerPage} />
        ) : (
          launchData &&
          launchData.length > 0 &&
          launchData
            .slice(initialPageValue, finalPageValue)
            .map((launch, index) => (
              <div key={index}>
                <Cards launch={launch} />
              </div>
            ))
        )}
      </Flex>

      <Flex mt={70} direction="row" justify="center" wrap="wrap" gap="md">
        {launchData && launchData.length > 8 && (
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
