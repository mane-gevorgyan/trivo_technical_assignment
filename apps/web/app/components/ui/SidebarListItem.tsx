"use client";

import type { IAccount } from "@/types/account";
import { ListItemButton, ListItemText } from "@mui/material";
import { useParams } from "next/navigation";
import Link from "next/link";

interface ISidebarListItemProps {
  account: IAccount;
}

const SidebarListItem = ({ account }: ISidebarListItemProps) => {
  const params = useParams<{ accountId?: string }>();
  const currentId = params.accountId ?? "";
  const isSelected = currentId === account.id;

  return (
    <ListItemButton
      component={Link}
      href={`/dashboard/${account.id}`}
      selected={isSelected}
      sx={{
        borderRadius: 2,
        mb: 1,
        px: 2,
        py: 1.25,
        "&.Mui-selected": {
          bgcolor: "primary.main",
          color: "primary.contrastText",
          "&:hover": { bgcolor: "primary.light" },
        },
      }}
    >
      <ListItemText
        primary={account.name}
        slotProps={{
          primary: {
            fontWeight: isSelected ? 700 : 500,
          },
        }}
      />
    </ListItemButton>
  );
};

SidebarListItem.displayName = "SidebarListItem";

export default SidebarListItem;
