import { loadSidebarAccounts } from "@/app/loaders/account-loader";
import type { IAccount } from "@/types/account";
import { Alert, List } from "@mui/material";
import SidebarListItem from "./SidebarListItem";

const AccountSidebar = async () => {
  let accounts: IAccount[] = [];
  let errorMessage: string | null = null;

  try {
    accounts = await loadSidebarAccounts();
  } catch (error) {
    errorMessage =
      error instanceof Error
        ? error.message
        : "Unable to load accounts right now.";
  }

  if (errorMessage) {
    return <Alert severity="error">{errorMessage}</Alert>;
  }

  if (accounts.length === 0) {
    return <Alert severity="info">No accounts are available yet.</Alert>;
  }

  return (
    <List
      aria-label="Accounts"
      sx={{
        maxHeight: "93vh",
        overflowY: "auto",
        scrollbarWidth: "none",
        pr: 1,
      }}
    >
      {accounts.map((account) => (
        <SidebarListItem key={account.id} account={account} />
      ))}
    </List>
  );
};

AccountSidebar.displayName = "AccountSidebar";

export default AccountSidebar;
