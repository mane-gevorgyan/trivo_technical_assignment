import { Container, Typography } from "@mui/material";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Typography variant="h4" fontWeight={700} gutterBottom>
        Account Settings
      </Typography>
      {children}
    </Container>
  );
}
