import { FC, useEffect, useMemo, useState } from "react";
import { PayloadCard } from "../../components/cards/PayloadCard";
import { useQuery } from "@tanstack/react-query";
import { getFilteredPayloadList, payloadList } from "./Payload.services";
import { IPayload } from "./Payloads.interface";
import { Flex, Pagination, Select, Text, TextInput } from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import { Loading } from "../../components/loading/Loading";

const Payloads: FC = () => {
  const [activePage, setPage] = useState(1);
  const [payloadFilter, setPayloadFilter] = useState("");
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebouncedValue(search, 700);

  const [searchLoading, setSearchLoading] = useState(false);

  useEffect(() => {
    setSearchLoading(search !== debouncedSearch);
  }, [search, debouncedSearch]);

  const {
    data: payloadData,
    isLoading: payloadLoading,
    error: payloadError,
  } = useQuery<IPayload[]>({
    queryKey: ["payload"],
    queryFn: payloadList(),
  });

  const {
    data: sortedPayloadData,
    isLoading: sortedLoading,
    error: sortedError,
  } = useQuery<IPayload[]>({
    queryKey: [payloadFilter, "filter"],
    queryFn: () => getFilteredPayloadList(),
    enabled: payloadFilter.length > 0,
  });

  const loading =
    payloadFilter.length > 0
      ? sortedLoading
      : debouncedSearch.length > 0
      ? searchLoading
      : payloadLoading;

  const filteredPayloadData = useMemo(() => {
    const baseData = payloadFilter.length > 0 ? sortedPayloadData : payloadData;
    if (!baseData) return [];

    if (!debouncedSearch.trim()) return baseData;

    const searchQuery = debouncedSearch.toLowerCase().trim();
    setPage(1);
    return baseData.filter((data) =>
      data.payload_id.toLowerCase().includes(searchQuery)
    );
  }, [debouncedSearch, payloadFilter, payloadData, sortedPayloadData]);

  const dataPerPage = 12;
  const totalPages = filteredPayloadData
    ? Math.ceil(filteredPayloadData?.length / dataPerPage)
    : 0;
  const initialPageValue = (activePage - 1) * dataPerPage;
  const finalPageValue = activePage * dataPerPage;

  useEffect(() => {
    setPage(1);
  }, [payloadFilter, debouncedSearch]);

  if (payloadError) return <>Error Occurred</>;

  return (
    <>
      <Flex
        direction={{ base: "column", sm: "row" }}
        gap={{ base: "sm", sm: "xl" }}
        justify={{ base: "center", sm: "flex-start" }}
        wrap="wrap"
        mb={40}
      >
        <Text style={{ fontSize: "24px" }}>Payloads Use By SpaceX</Text>
      </Flex>
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

        <Select
          placeholder="Filter Launches"
          data={["Flight number"]}
          searchValue={payloadFilter}
          onSearchChange={setPayloadFilter}
          clearable
          style={{ border: "1px solid grey", color: "black" }}
        />
      </Flex>
      <Flex
        direction={{ base: "column", sm: "row" }}
        gap={{ base: "sm", sm: "lg" }}
        justify={{ sm: "center" }}
        wrap="wrap"
      >
        {filteredPayloadData.length === 0 && <>No Payload Data Available</>}
      </Flex>

      <Flex
        direction={{ base: "column", sm: "row" }}
        gap={{ base: "sm", sm: "lg" }}
        justify={{ sm: "flex-start" }}
        wrap="wrap"
      >
        {loading ? (
          <>
            <Loading count={dataPerPage} />
          </>
        ) : (
          filteredPayloadData &&
          filteredPayloadData.length > 0 &&
          filteredPayloadData
            .slice(initialPageValue, finalPageValue)
            .map((data) => {
              return (
                <>
                  <PayloadCard data={data} key={data.payload_id} />
                </>
              );
            })
        )}
      </Flex>

      <Flex
        direction={{ base: "column", sm: "row" }}
        gap={{ base: "sm", sm: "lg" }}
        justify={{ sm: "center" }}
        wrap="wrap"
        mt={70}
      >
        {filteredPayloadData && filteredPayloadData?.length > 8 && (
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

export default Payloads;
