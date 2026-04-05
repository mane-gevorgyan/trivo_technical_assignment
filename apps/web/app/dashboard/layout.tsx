import { Box, Container, Divider, Typography, Grid } from "@mui/material";
import AccountSidebar from "../components/ui/AccountSidebar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box>
      <Box
        sx={{
          py: 3,
          display: "flex",
          flexDirection: "column",
          gap: 3,
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="h2" fontSize={42} fontWeight={700}>
            Account Settings
          </Typography>
          <Typography color="text.secondary" sx={{ mt: 1 }}>
            Manage account-level preferences, delivery channels, and support
            details.
          </Typography>
        </Container>
        <Divider orientation="horizontal" />
      </Box>

      <Container maxWidth="lg" sx={{ py: 5 }}>
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 3 }}>
            <AccountSidebar />
          </Grid>

          <Grid
            size={{ md: "auto" }}
            sx={{ display: { xs: "none", md: "block" } }}
          >
            <Divider orientation="vertical" flexItem sx={{ height: "100%" }} />
          </Grid>

          <Grid size={{ xs: 12, md: 8.5 }}>
            <Box sx={{ minHeight: "60vh" }}>{children}</Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

DashboardLayout.displayName = "DashboardLayout";

export default DashboardLayout;
