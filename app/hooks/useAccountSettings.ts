import { useMemo, useState } from "react";
import { useForm, useWatch } from "react-hook-form";

import type { FullAccountData, IAccountSettings } from "@/types/account";

import { useIsHydrated } from "./useIsHydrated";

const buildStorageKey = (accountId: string) => `account-settings:${accountId}`;
const SIMULATED_SAVE_DELAY_MS = 400;

const extractSettings = (account: FullAccountData): IAccountSettings => ({
  notifications: account.notifications,
  support_email: account.support_email,
  daily_email_limit: account.daily_email_limit,
  timezone: account.timezone,
  allowed_channels: account.allowed_channels,
});

const getStoredSettings = (
  account: FullAccountData,
  fallbackSettings: IAccountSettings
) => {
  const storedSettings = window.localStorage.getItem(
    buildStorageKey(account.id)
  );

  if (!storedSettings) {
    return fallbackSettings;
  }

  try {
    const parsedSettings = JSON.parse(
      storedSettings
    ) as Partial<IAccountSettings>;

    return {
      ...fallbackSettings,
      ...parsedSettings,
    };
  } catch {
    return fallbackSettings;
  }
};

export const useAccountSettings = (account: FullAccountData) => {
  const initialSettings = useMemo(() => extractSettings(account), [account]);
  const isHydrated = useIsHydrated();
  const initialClientSettings = useMemo(() => {
    if (typeof window === "undefined") {
      return initialSettings;
    }

    return getStoredSettings(account, initialSettings);
  }, [account, initialSettings]);

  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [savedSettings, setSavedSettings] = useState<IAccountSettings>(
    initialClientSettings
  );

  const form = useForm<IAccountSettings>({
    defaultValues: initialClientSettings,
    mode: "onSubmit",
    reValidateMode: "onChange",
  });

  const { control, handleSubmit, reset } = form;
  const watchedValues = useWatch({
    control,
  });

  const startEditing = () => {
    reset(savedSettings);
    setIsEditing(true);
  };

  const cancelEditing = () => {
    reset(savedSettings);
    setIsEditing(false);
  };

  const saveSettings = handleSubmit(async (nextSettings) => {
    setIsSaving(true);
    await new Promise((resolve) =>
      window.setTimeout(resolve, SIMULATED_SAVE_DELAY_MS)
    );

    window.localStorage.setItem(
      buildStorageKey(account.id),
      JSON.stringify(nextSettings)
    );

    setSavedSettings(nextSettings);
    reset(nextSettings);
    setIsSaving(false);
    setIsEditing(false);
  });

  return {
    control,
    displayedSettings: isEditing
      ? { ...savedSettings, ...watchedValues }
      : savedSettings,
    form,
    isEditing,
    isReady: isHydrated,
    isSaving,
    startEditing,
    cancelEditing,
    saveSettings,
  };
};
