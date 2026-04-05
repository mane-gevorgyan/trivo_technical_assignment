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
    reset(initialSettings);
    setIsEditing(false);
  }, [initialSettings, reset]);

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

    try {
      const updatedAccount = await dispatchAccountSettingsUpdate(
        account.id,
        nextSettings,
      );
      const updatedSettings = extractAccountSettings(updatedAccount);

      setSavedSettings(updatedSettings);
      reset(updatedSettings);
      setIsEditing(false);
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
    startEditing,
    cancelEditing,
    saveSettings,
  };
};
