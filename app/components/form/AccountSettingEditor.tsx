"use client";

import {
  Checkbox,
  FormControlLabel,
  MenuItem,
  Stack,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { Controller, type Control } from "react-hook-form";

import type { AccountSettingDefinition } from "@/config/accountSettings";
import type { IAccountSettings } from "@/types/account";

interface AccountSettingEditorProps {
  control: Control<IAccountSettings>;
  setting: AccountSettingDefinition;
}

const AccountSettingEditor = ({
  control,
  setting,
}: AccountSettingEditorProps) => {
  return (
    <Controller
      control={control}
      name={setting.key}
      render={({ field }) => {
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
              value={String(field.value ?? "")}
              placeholder={setting.placeholder}
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
          []) as IAccountSettings["allowed_channels"];

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
          </Stack>
        );
      }}
    />
  );
};

AccountSettingEditor.displayName = "AccountSettingEditor";

export default AccountSettingEditor;
