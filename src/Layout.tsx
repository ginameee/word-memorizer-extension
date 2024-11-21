import { Box, ThemeProvider } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PropsWithChildren } from "react";
import theme from "./theme";

const queryClient = new QueryClient();

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <Box
          sx={{
            color: "white",
            maxWidth: "600px",
          }}
        >
          {children}
        </Box>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default Layout;
