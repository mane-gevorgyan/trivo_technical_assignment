"use client";

import { Alert, Paper, Stack } from "@mui/material";

import { ACCOUNT_SETTINGS_SCHEMA } from "@/config/accountSettings";
import { useAccountSettings } from "@/app/hooks/useAccountSettings";
import type { FullAccountData } from "@/types/account";

import AccountSettingsActions from "./AccountSettingsActions";
import AccountSettingField from "./AccountSettingField";
import AccountSettingsLoading from "./AccountSettingsLoading";

interface AccountSettingsFormProps {
  account: FullAccountData;
}

const AccountSettingsForm = ({ account }: AccountSettingsFormProps) => {
  const {
    control,
    displayedSettings,
    isEditing,
    isReady,
    isSaving,
    saveError,
    startEditing,
    cancelEditing,
    saveSettings,
  } = useAccountSettings(account);

  if (!isReady) {
    return <AccountSettingsLoading />;
  }

  return (
    <Stack spacing={3}>
      {saveError ? <Alert severity="error">{saveError}</Alert> : null}

      <AccountSettingsActions
        isEditing={isEditing}
        isSaving={isSaving}
        onCancel={cancelEditing}
        onEdit={startEditing}
        onSave={saveSettings}
      />

      <Paper variant="outlined" sx={{ borderRadius: 3, p: 3 }}>
        <Stack spacing={2.5}>
          {ACCOUNT_SETTINGS_SCHEMA.map((setting) => (
            <AccountSettingField
              key={setting.key}
              control={control}
              isEditing={isEditing}
              setting={setting}
              value={displayedSettings[setting.key]}
            />
          ))}
        </Stack>
      </Paper>
    </Stack>
  );
};

AccountSettingsForm.displayName = "AccountSettingsForm";

export default AccountSettingsForm;
