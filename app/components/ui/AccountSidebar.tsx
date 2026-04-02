import { MOCK_ACCOUNTS } from "@/config/mockData";
import { List } from "@mui/material";
import SidebarListItem from "./SidebarListItem";

const AccountSidebar = () => {
  return (
    <List
      aria-label="Accounts"
      sx={{
        maxHeight: "70vh",
        overflowY: "auto",
        scrollbarWidth: "none",
        pr: 1,
      }}
    >
      {MOCK_ACCOUNTS.map((account) => (
        <SidebarListItem key={account.id} account={account} />
      ))}
    </List>
  );
};

AccountSidebar.displayName = "AccountSidebar";

export default AccountSidebar;
