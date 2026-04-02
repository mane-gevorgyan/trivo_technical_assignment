import { getAccountById } from "@/config/mockData";
import AccountSettingsPanel from "@/app/components/form/AccountSettingsPanel";
import { Typography } from "@mui/material";

const SIMULATED_ACCOUNT_RESPONSE_DELAY_MS = 400;

interface AccountPageProps {
  params: Promise<{
    accountId: string;
  }>;
}

const AccountPage = async ({ params }: AccountPageProps) => {
  const { accountId } = await params;

  await new Promise((resolve) =>
    setTimeout(resolve, SIMULATED_ACCOUNT_RESPONSE_DELAY_MS),
  );

  const account = getAccountById(accountId);

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
