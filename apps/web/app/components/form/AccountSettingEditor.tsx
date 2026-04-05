import {
  Checkbox,
  FormControlLabel,
  FormHelperText,
  MenuItem,
  Stack,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { Controller, type Control } from "react-hook-form";

import type { AccountSettingDefinition } from "@/config/accountSettings";
import { useAccountSettingValidation } from "@/app/hooks/useAccountSettingValidation";
import type { IAccountSettings } from "@/types/account";

interface AccountSettingEditorProps {
  control: Control<IAccountSettings>;
  setting: AccountSettingDefinition;
}

const AccountSettingEditor = ({
  control,
  setting,
}: AccountSettingEditorProps) => {
  const rules = useAccountSettingValidation(setting);

  return (
    <Controller
      control={control}
      name={setting.key}
      rules={rules}
      render={({ field, fieldState }) => {
        if (setting.type === "boolean") {
          return (
            <Stack direction="row" spacing={1.5} alignItems="center">
              <Switch
                checked={Boolean(field.value)}
                onChange={(event) => field.onChange(event.target.checked)}
              />
              <Typography variant="body2" color="text.secondary">
                {field.value ? "Enabled" : "Disabled"}
              </Typography>
            </Stack>
          );
        }

        if (setting.type === "text") {
          return (
            <TextField
              fullWidth
              size="small"
              type={setting.inputType ?? "text"}
              value={String(field.value ?? "")}
              placeholder={setting.placeholder}
              error={Boolean(fieldState.error)}
              helperText={fieldState.error?.message}
              onChange={field.onChange}
            />
          );
        }

        if (setting.type === "number") {
          return (
            <TextField
              fullWidth
              size="small"
              type="number"
              value={Number(field.value ?? 0)}
              error={Boolean(fieldState.error)}
              helperText={fieldState.error?.message}
              onChange={(event) => field.onChange(Number(event.target.value))}
              slotProps={{
                htmlInput: {
                  min: setting.min,
                  max: setting.max,
                },
              }}
            />
          );
        }

        if (setting.type === "select") {
          return (
            <TextField
              select
              fullWidth
              size="small"
              value={String(field.value ?? "")}
              error={Boolean(fieldState.error)}
              helperText={fieldState.error?.message}
              onChange={field.onChange}
            >
              {setting.options.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          );
        }

        const selectedValues = (field.value ??
          []) as IAccountSettings["allowedChannels"];

        return (
          <Stack spacing={1}>
            {setting.options.map((option) => {
              const isChecked = selectedValues.includes(option.value);

              return (
                <FormControlLabel
                  key={option.value}
                  control={
                    <Checkbox
                      checked={isChecked}
                      onChange={() =>
                        field.onChange(
                          isChecked
                            ? selectedValues.filter(
                                (selectedValue) =>
                                  selectedValue !== option.value,
                              )
                            : [...selectedValues, option.value],
                        )
                      }
                    />
                  }
                  label={option.label}
                />
              );
            })}
            {fieldState.error ? (
              <FormHelperText error>{fieldState.error.message}</FormHelperText>
            ) : null}
          </Stack>
        );
      }}
    />
  );
};

AccountSettingEditor.displayName = "AccountSettingEditor";

export default AccountSettingEditor;
