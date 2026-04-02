import { Box, Skeleton, Stack } from "@mui/material";

import AccountSettingsLoading from "@/app/components/form/AccountSettingsLoading";

const AccountPageLoading = () => {
  return (
    <Stack spacing={3}>
      <Box>
        <Skeleton variant="text" width="40%" height={52} />
        <Skeleton variant="text" width="70%" height={28} />
      </Box>

      <AccountSettingsLoading />
    </Stack>
  );
};

AccountPageLoading.displayName = "AccountPageLoading";

export default AccountPageLoading;
