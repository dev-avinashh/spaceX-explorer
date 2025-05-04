import { FC, useState } from "react";
import { Cards } from "../../components/cards/Cards";
import { Flex, Pagination } from "@mantine/core";
import { launchResponseData } from "./launches.services";
import { useQuery } from "@tanstack/react-query";
import { ILaunch } from "./launches.interface";

const Launches: FC = () => {
  const {
    data: launches,
    isLoading,
    error,
  } = useQuery<ILaunch[]>({
    queryKey: ["launches"],
    queryFn: launchResponseData(),
  });
  const [activePage, setPage] = useState(1);

  const pagePerContent = 12;
  const totalPages = launches ? launches?.length / pagePerContent : 0;
  const initialPageValue = (activePage - 1) * pagePerContent;
  const finalPageValue = activePage * pagePerContent;

  if (isLoading) return <div>Loading launches...</div>;
  if (error)
    return <div>Error loading launches: {(error as Error).message}</div>;

  return (
    <>
      <Flex
        direction={{ base: "column", sm: "row" }}
        gap={{ base: "sm", sm: "lg" }}
        justify={{ sm: "center" }}
        wrap="wrap"
      >
        {launches &&
          launches
            .slice(initialPageValue, finalPageValue)
            .map((launch, index) => (
              <div key={index}>
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
        <Pagination value={activePage} onChange={setPage} total={totalPages} />
      </Flex>
    </>
  );
};

export default Launches;
