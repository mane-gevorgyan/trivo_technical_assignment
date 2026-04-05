import { loadDefaultAccount } from "@/app/loaders/account-loader";
import { Alert, Container } from "@mui/material";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  let defaultAccount = null;
  let errorMessage: string | null = null;

  try {
    defaultAccount = await loadDefaultAccount();
  } catch (error) {
    errorMessage =
      error instanceof Error
        ? error.message
        : "Unable to load accounts right now.";
  }

  if (defaultAccount) {
    redirect(`/dashboard/${defaultAccount.id}`);
  }

  if (errorMessage) {
    return (
      <Container>
        <Alert severity="error">{errorMessage}</Alert>
      </Container>
    );
  }

  return (
    <Container>
      Please Select an account from the sidebar to view its details
    </Container>
  );
}
