import { FC, useMemo, useState } from "react";
import { PayloadCard } from "../../components/cards/PayloadCard";
import { useQuery } from "@tanstack/react-query";
import { getFilteredPayloadList, payloadList } from "./Payload.services";
import { IPayload } from "./Payloads.interface";
import { Flex, Pagination, Select, TextInput } from "@mantine/core";

const Payloads: FC = () => {
  const [activePage, setPage] = useState(1);
  const [payloadFilter, setPayloadFilter] = useState("");
  const [search, setSearch] = useState("");

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

  const filteredPayloadData = useMemo(() => {
    const baseData = payloadFilter.length > 0 ? sortedPayloadData : payloadData;
    if (!baseData) return [];

    if (!search.trim()) return baseData;

    const searchQuery = search.toLowerCase().trim();
    setPage(1)
    return baseData.filter((data) =>
      data.payload_id.toLowerCase().includes(searchQuery)
    );
  }, [search, payloadFilter, payloadData, sortedPayloadData]);

  const dataPerPage = 12;
  const totalPages = filteredPayloadData
    ? Math.ceil(filteredPayloadData?.length / dataPerPage)
    : 0;
  const initialPageValue = (activePage - 1) * dataPerPage;
  const finalPageValue = activePage * dataPerPage;

  if (payloadError) return <>Error Occurred</>;

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
          data={["Flight number"]}
          searchValue={payloadFilter}
          onSearchChange={setPayloadFilter}
          clearable
        />
      </Flex>
      <Flex
        direction={{ base: "column", sm: "row" }}
        gap={{ base: "sm", sm: "lg" }}
        justify={{ sm: "center" }}
        wrap="wrap"
      >
        {filteredPayloadData &&
          filteredPayloadData.length > 0 &&
          filteredPayloadData
            .slice(initialPageValue, finalPageValue)
            .map((data) => {
              return (
                <>
                  <PayloadCard data={data} key={data.payload_id} />
                </>
              );
            })}
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
