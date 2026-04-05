import AccountSettingsPanel from "@/app/components/form/AccountSettingsPanel";
import { loadSingleAccount } from "@/app/loaders/account-loader";
import { Typography } from "@mui/material";

interface AccountPageProps {
  params: Promise<{
    accountId: string;
  }>;
}

const AccountPage = async ({ params }: AccountPageProps) => {
  const { accountId } = await params;

  let account = null;

  try {
    account = await loadSingleAccount(accountId);
  } catch {
    account = null;
  }

  if (!account) {
    return (
      <Typography variant="body1">
        Account not found. Please check the URL and try again.
      </Typography>
    );
  }

  return <AccountSettingsPanel key={account.id} account={account} />;
};

AccountPage.displayName = "AccountPage";

export default AccountPage;
