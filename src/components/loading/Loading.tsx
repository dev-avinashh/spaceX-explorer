import { Box, Skeleton } from "@mantine/core";

interface ILoadingProps {
  count: number;
}
export const Loading = ({ count }: ILoadingProps) => {
  const skeletons = [];
  for (let i = 0; i < count; i++) {
    skeletons.push(i);
  }
  return (
    <>
      {skeletons.map((index) => (
        <Box key={index} mb={20} mr={20}>
          <Skeleton height={200} width={350} mb={10} radius="md" />
          <Skeleton height={20} width={250} mb={8} radius="sm" />
          <Skeleton height={15} width={150} radius="sm" />
        </Box>
      ))}
    </>
  );
};
