"use client";

import { Paper, Skeleton, Stack } from "@mui/material";
import { useAccountSettingsLoading } from "@/app/hooks/useAccountSettingsLoading";

const AccountSettingsLoading = () => {
  const loadingSections = useAccountSettingsLoading();

  return (
    <Paper variant="outlined" sx={{ borderRadius: 3, p: 3 }}>
      <Stack spacing={2.5}>
        {loadingSections.map((section) => (
          <Stack key={section.key} spacing={1.25}>
            <Skeleton variant="text" width="30%" height={28} />
            {section.hasDescription ? (
              <Skeleton variant="text" width="75%" height={22} />
            ) : null}
            <Skeleton variant="rounded" height={section.height} />
          </Stack>
        ))}
      </Stack>
    </Paper>
  );
};

AccountSettingsLoading.displayName = "AccountSettingsLoading";

export default AccountSettingsLoading;
