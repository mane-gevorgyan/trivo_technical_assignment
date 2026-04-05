import { Box, Chip, Stack, Switch, Typography } from "@mui/material";
import type { Control } from "react-hook-form";

import type { AccountSettingDefinition } from "@/config/accountSettings";
import type { IAccountSettings } from "@/types/account";
import AccountSettingEditor from "./AccountSettingEditor";

interface AccountSettingFieldProps {
  control: Control<IAccountSettings>;
  isEditing: boolean;
  setting: AccountSettingDefinition;
  value: IAccountSettings[keyof IAccountSettings];
}

const renderReadOnlyValue = (
  setting: AccountSettingDefinition,
  value: IAccountSettings[keyof IAccountSettings],
) => {
  if (setting.type === "boolean") {
    return (
      <Stack direction="row" spacing={1.5} alignItems="center">
        <Switch checked={Boolean(value)} disabled />
        <Typography variant="body2" color="text.secondary">
          {value ? "Enabled" : "Disabled"}
        </Typography>
      </Stack>
    );
  }

  if (setting.type === "multiselect") {
    const selectedValues = value as IAccountSettings["allowedChannels"];

    if (selectedValues.length === 0) {
      return (
        <Typography variant="body2" color="text.secondary">
          No options selected.
        </Typography>
      );
    }

    return (
      <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
        {selectedValues.map((selectedValue) => {
          const option = setting.options.find(
            (currentOption) => currentOption.value === selectedValue,
          );

          return (
            <Chip
              key={selectedValue}
              label={option?.label ?? selectedValue}
              size="small"
            />
          );
        })}
      </Stack>
    );
  }

  if (setting.type === "number") {
    return (
      <Typography variant="body1">
        {String(value)}
        {setting.suffix ? ` ${setting.suffix}` : ""}
      </Typography>
    );
  }

  if (setting.type === "select") {
    const option = setting.options.find(
      (currentOption) => currentOption.value === value,
    );

    return (
      <Typography variant="body1">{option?.label ?? String(value)}</Typography>
    );
  }

  return <Typography variant="body1">{String(value)}</Typography>;
};

const AccountSettingField = ({
  control,
  isEditing,
  setting,
  value,
}: AccountSettingFieldProps) => {
  return (
    <Box>
      <Typography variant="subtitle2" color="text.secondary" gutterBottom>
        {setting.label}
      </Typography>
      {setting.description ? (
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
          {setting.description}
        </Typography>
      ) : null}
      {isEditing ? (
        <AccountSettingEditor control={control} setting={setting} />
      ) : (
        renderReadOnlyValue(setting, value)
      )}
    </Box>
  );
};

AccountSettingField.displayName = "AccountSettingField";

export default AccountSettingField;
