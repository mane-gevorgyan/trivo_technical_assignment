"use client";

import { Stack } from "@mui/material";

import ButtonComponent from "../ui/Button";

interface AccountSettingsActionsProps {
  isEditing: boolean;
  isSaving: boolean;
  onCancel: () => void;
  onEdit: () => void;
  onSave: () => void;
}

const AccountSettingsActions = ({
  isEditing,
  isSaving,
  onCancel,
  onEdit,
  onSave,
}: AccountSettingsActionsProps) => {
  if (isEditing) {
    return (
      <Stack direction="row" spacing={1.5} justifyContent="flex-end">
        <ButtonComponent
          variant="text"
          size="small"
          onClick={onCancel}
          disabled={isSaving}
        >
          Cancel
        </ButtonComponent>
        <ButtonComponent size="small" onClick={onSave} disabled={isSaving}>
          {isSaving ? "Saving..." : "Save"}
        </ButtonComponent>
      </Stack>
    );
  }

  return (
    <Stack direction="row" justifyContent="flex-end">
      <ButtonComponent onClick={onEdit} variant="outlined" size="small">
        Edit
      </ButtonComponent>
    </Stack>
  );
};

AccountSettingsActions.displayName = "AccountSettingsActions";

export default AccountSettingsActions;
