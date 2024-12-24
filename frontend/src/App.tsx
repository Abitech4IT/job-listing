import { ThemeProvider } from "@emotion/react";
import { theme } from "./theme";
import AppRoutes from "./routes/AppRoutes";
import "./index.css";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AppRoutes />
    </ThemeProvider>
  );
}

export default App;
