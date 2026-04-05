import { DEFAULT_ACCOUNT } from "@/config/mockData";
import { Container } from "@mui/material";
import { redirect } from "next/navigation";

export default function DashboardPage() {
  if (DEFAULT_ACCOUNT) {
    redirect(`/dashboard/${DEFAULT_ACCOUNT.id}`);
  } else {
    return (
      <Container>
        Please Select an account from the sidebar to view its details
      </Container>
    );
  }
}
