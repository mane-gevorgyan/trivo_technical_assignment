import AccountSettingsPanel from "@/app/components/form/AccountSettingsPanel";
import { loadSingleAccount } from "@/app/loaders/account-loader";
import { ApiError } from "@/axiosInstance";
import { Alert, Typography } from "@mui/material";

interface AccountPageProps {
  params: Promise<{
    accountId: string;
  }>;
}

const AccountPage = async ({ params }: AccountPageProps) => {
  const { accountId } = await params;
  let account = null;
  let errorMessage: string | null = null;

  try {
    account = await loadSingleAccount(accountId);
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) {
      errorMessage = "Account not found. Please check the URL and try again.";
    } else {
      errorMessage =
        error instanceof Error
          ? error.message
          : "Unable to load account details right now.";
    }
  }

  if (errorMessage) {
    if (account === null && errorMessage.includes("Account not found")) {
      return <Typography variant="body1">{errorMessage}</Typography>;
    }

    return <Alert severity="error">{errorMessage}</Alert>;
  }

  if (!account) {
    return (
      <Alert severity="error">Unable to load account details right now.</Alert>
    );
  }

  return <AccountSettingsPanel key={account.id} account={account} />;
};

AccountPage.displayName = "AccountPage";

export default AccountPage;
