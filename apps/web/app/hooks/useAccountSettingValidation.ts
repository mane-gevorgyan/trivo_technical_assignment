import type { RegisterOptions } from "react-hook-form";

import type { AccountSettingDefinition } from "@/config/accountSettings";
import type { IAccountSettings } from "@/types/account";

const buildRequiredMessage = (setting: AccountSettingDefinition) =>
  setting.requiredMessage ?? `${setting.label} is required.`;

export const useAccountSettingValidation = (
  setting: AccountSettingDefinition
): RegisterOptions<IAccountSettings, keyof IAccountSettings> | undefined => {
  if (setting.type === "text") {
    const rules: RegisterOptions<IAccountSettings, keyof IAccountSettings> = {};

    if (setting.required) {
      rules.required = buildRequiredMessage(setting);
    }

    if (setting.pattern) {
      rules.pattern = {
        value: setting.pattern,
        message:
          setting.patternMessage ?? `Enter a valid value for ${setting.label}.`,
      };
    }

    return Object.keys(rules).length > 0 ? rules : undefined;
  }

  if (setting.type === "number") {
    return {
      required: setting.required ? buildRequiredMessage(setting) : false,
      validate: (value) => {
        if (typeof value !== "number" || Number.isNaN(value)) {
          return "Enter a valid number.";
        }

        if (setting.integer && !Number.isInteger(value)) {
          return `${setting.label} must be a whole number.`;
        }

        if (typeof setting.min === "number" && value < setting.min) {
          return `${setting.label} must be at least ${setting.min}.`;
        }

        if (typeof setting.max === "number" && value > setting.max) {
          return `${setting.label} must be at most ${setting.max}.`;
        }

        return true;
      },
    };
  }

  if (setting.type === "select") {
    return setting.required
      ? {
          required: buildRequiredMessage(setting),
        }
      : undefined;
  }

  return undefined;
};
