import { Box, Stack, Typography } from "@mui/material";

import ButtonComponent from "./components/ui/Button";

const Home = () => {
  return (
    <Box
      component="main"
      sx={{
        alignItems: "center",
        backgroundColor: "#f5f7fb",
        display: "flex",
        justifyContent: "center",
        minHeight: "100vh",
        px: 3,
      }}
    >
      <Stack
        spacing={3}
        sx={{
          alignItems: "center",
          backgroundColor: "#ffffff",
          border: "1px solid",
          borderColor: "#eef2f8",
          borderRadius: 4,
          boxShadow: "0 20px 50px rgba(15, 23, 42, 0.08)",
          maxWidth: 520,
          p: 5,
          textAlign: "center",
          width: "100%",
        }}
      >
        <Typography
          sx={{
            color: "#111827",
            fontSize: { xs: "2rem", md: "2.25rem" },
            fontWeight: 800,
            letterSpacing: "-0.03em",
            lineHeight: 1.1,
          }}
        >
          Welcome to the Account Settings page!
        </Typography>

        <Typography
          sx={{
            color: "#6b7280",
            maxWidth: 360,
          }}
        >
          Technical Assignment for Trivo. Manage your connected accounts and
          preferences.
        </Typography>

        <ButtonComponent href="/dashboard">Go to Dashboard</ButtonComponent>
      </Stack>
    </Box>
  );
};

Home.displayName = "Home";

export default Home;
