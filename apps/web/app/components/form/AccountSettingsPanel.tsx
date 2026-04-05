import { Box, Stack, Typography } from "@mui/material";

import type { FullAccountData } from "@/types/account";

import AccountSettingsForm from "./AccountSettingsForm";

interface AccountSettingsPanelProps {
  account: FullAccountData;
}

const AccountSettingsPanel = ({ account }: AccountSettingsPanelProps) => {
  return (
    <Stack
      spacing={3}
      sx={{
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <Box>
        <Typography variant="h4" fontWeight={700} gutterBottom>
          {account.name}
        </Typography>
        <Typography color="text.secondary">
          Review and manage this account&apos;s settings. Saved changes are
          persisted through the backend API.
        </Typography>
      </Box>

      <AccountSettingsForm account={account} />
    </Stack>
  );
};

AccountSettingsPanel.displayName = "AccountSettingsPanel";

export default AccountSettingsPanel;
