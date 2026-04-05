import { loadDefaultAccount } from "@/app/loaders/account-loader";
import { Container } from "@mui/material";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const defaultAccount = await loadDefaultAccount();

  if (defaultAccount) {
    redirect(`/dashboard/${defaultAccount.id}`);
  } else {
    return (
      <Container>
        Please Select an account from the sidebar to view its details
      </Container>
    );
  }
}
