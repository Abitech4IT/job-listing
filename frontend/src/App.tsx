import { ThemeProvider } from "@emotion/react";
import { theme } from "./theme";
import AppRoutes from "./routes/AppRoutes";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import { UserProvider } from "./services/signinAPI";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      // staleTime: 0,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <UserProvider>
        <ThemeProvider theme={theme}>
          <AppRoutes />
          <Toaster
            position="top-center"
            gutter={12}
            containerStyle={{ margin: "8px" }}
            toastOptions={{
              success: {
                duration: 3000,
              },
              error: {
                duration: 5000,
              },
              style: {
                fontSize: "16px",
                maxWidth: "500px",
                padding: "16px, 24px",
                backgroundColor: "#fff",
                color: "#010f0f",
              },
            }}
          />
        </ThemeProvider>
      </UserProvider>
    </QueryClientProvider>
  );
}

export default App;
