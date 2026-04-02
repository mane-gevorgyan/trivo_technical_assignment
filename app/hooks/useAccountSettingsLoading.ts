import { ACCOUNT_SETTINGS_SCHEMA } from "@/config/accountSettings";

export const useAccountSettingsLoading = () => {
  return ACCOUNT_SETTINGS_SCHEMA.map((setting) => ({
    key: setting.key,
    hasDescription: Boolean(setting.description),
    height: setting.type === "multiselect" ? 120 : 44,
  }));
};
