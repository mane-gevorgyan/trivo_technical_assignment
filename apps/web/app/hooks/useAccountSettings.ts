import { useEffect, useMemo, useState } from "react";
import { useForm, useWatch } from "react-hook-form";

import { dispatchAccountSettingsUpdate } from "@/app/dispatchers/account-dispatcher";
import { extractAccountSettings } from "@/lib/account-settings";
import type { FullAccountData, IAccountSettings } from "@/types/account";

export const useAccountSettings = (account: FullAccountData) => {
  const initialSettings = useMemo(
    () => extractAccountSettings(account),
    [account],
  );

  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [savedSettings, setSavedSettings] =
    useState<IAccountSettings>(initialSettings);

  const form = useForm<IAccountSettings>({
    defaultValues: initialSettings,
    mode: "onSubmit",
    reValidateMode: "onChange",
  });

  const { control, handleSubmit, reset } = form;
  const watchedValues = useWatch({
    control,
  });

  useEffect(() => {
    setSavedSettings(initialSettings);
    setSaveError(null);
    reset(initialSettings);
    setIsEditing(false);
  }, [initialSettings, reset]);

  const startEditing = () => {
    setSaveError(null);
    reset(savedSettings);
    setIsEditing(true);
  };

  const cancelEditing = () => {
    setSaveError(null);
    reset(savedSettings);
    setIsEditing(false);
  };

  const saveSettings = handleSubmit(async (nextSettings) => {
    setIsSaving(true);
    setSaveError(null);

    try {
      const updatedAccount = await dispatchAccountSettingsUpdate(
        account.id,
        nextSettings,
      );
      const updatedSettings = extractAccountSettings(updatedAccount);

      setSavedSettings(updatedSettings);
      reset(updatedSettings);
      setIsEditing(false);
    } catch (error) {
      setSaveError(
        error instanceof Error
          ? error.message
          : "Unable to save account settings. Please try again.",
      );
    } finally {
      setIsSaving(false);
    }
  });

  return {
    control,
    displayedSettings: isEditing
      ? { ...savedSettings, ...watchedValues }
      : savedSettings,
    form,
    isEditing,
    isReady: true,
    isSaving,
    saveError,
    startEditing,
    cancelEditing,
    saveSettings,
  };
};
