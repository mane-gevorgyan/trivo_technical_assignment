import { loadSidebarAccounts } from "@/app/loaders/account-loader";
import { List } from "@mui/material";
import SidebarListItem from "./SidebarListItem";

const AccountSidebar = async () => {
  const accounts = await loadSidebarAccounts();

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
