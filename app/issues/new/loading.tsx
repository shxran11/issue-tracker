import { Skeleton } from "@/app/components";
import { Box } from "@radix-ui/themes";

const loading = () => {
  return (
    <Box>
      <Skeleton height="5rem" />
      <Skeleton height="20rem" />
    </Box>
  );
};

export default loading;
