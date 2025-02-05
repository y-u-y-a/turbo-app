import { Box, Stack } from "@mantine/core";
import { Outlet } from "react-router-dom";

export const RootLayout = () => {
  const HEADER_HEIGHT = 70;

  return (
    <>
      <Stack gap={0} mih="100vh">
        <Box mt={`${HEADER_HEIGHT}px`} px="20px" py="40px" flex={1}>
          <Outlet />
        </Box>
      </Stack>
    </>
  );
};
