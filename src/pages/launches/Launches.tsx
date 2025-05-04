import { FC, useState } from "react";
import { Cards } from "../../components/cards/Cards";
import { Flex, Pagination, Select, TextInput } from "@mantine/core";
import {
  getLaunchDataByFilter,
  launchResponseData,
  searchByRocketName,
} from "./launches.services";
import { useQuery } from "@tanstack/react-query";
import { ILaunch } from "./launches.interface";

const Launches: FC = () => {
  const [activePage, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [launchFilter, setLaunchFilter] = useState("");

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
    queryKey: [search, "search"],
    queryFn: () => searchByRocketName(search),
    enabled: search.length > 0,
  });

  // query for handling filters
  const {
    data: filteredLaunchedData,
    isLoading: filteredLaunchDataLoading,
    error: filteredLaunchDataError,
  } = useQuery<ILaunch[]>({
    queryKey: [launchFilter, "filter"],
    queryFn: () => getLaunchDataByFilter(launchFilter),
    enabled: launchFilter.length > 0,
  });

  const launchData =
    search.length > 0
      ? searchedLaunches
      : launchFilter?.length > 0
      ? filteredLaunchedData
      : launches;
  const launchLoading =
    search.length > 0
      ? searchedLoading
      : launchFilter?.length > 0
      ? filteredLaunchDataLoading
      : allLaunchLoading;
  const launchError =
    search.length > 0
      ? searchedError
      : launchFilter?.length > 0
      ? filteredLaunchDataError
      : allLaunchError;
  const pagePerContent = 12;
  const totalPages = launchData
    ? Math.ceil(launchData.length / pagePerContent)
    : 0;
  const initialPageValue = (activePage - 1) * pagePerContent;
  const finalPageValue = activePage * pagePerContent;

  if (launchError) return <div>Error loading launches</div>;

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

        <Select
          placeholder="Filter Launches"
          data={["Past", "upcoming"]}
          searchValue={launchFilter}
          onSearchChange={setLaunchFilter}
          clearable
        />
      </Flex>
      <Flex
        direction={{ base: "column", sm: "row" }}
        gap={{ base: "sm", sm: "lg" }}
        justify={{ sm: "center" }}
        wrap="wrap"
      >
        {launchLoading && <>loading launches</>}
        {launchData?.length === 0 && <>No result found</>}
        {launchData &&
          launchData?.length > 0 &&
          launchData
            .slice(initialPageValue, finalPageValue)
            .map((launch: any) => (
              <div key={launch.flight_number}>
                <Cards launch={launch} />
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
        {launchData && launchData?.length > 8 && (
          <Pagination
            value={activePage}
            onChange={setPage}
            total={totalPages}
          />
        )}
      </Flex>
    </>
  );
};

export default Launches;
