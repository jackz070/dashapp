import { ThemeProvider, createTheme } from "@mui/material/styles";
import { ReactNode, useEffect, useMemo } from "react";
import { themeSettings } from "./theme";
import { Box, CssBaseline, ThemeOptions } from "@mui/material";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./pages/navbar/Navbar";
import Dashboard from "./pages/dashboard/Dashboard";
import Settings from "./pages/Settings";
import { AnimatePresence } from "framer-motion";
import DashboardTransitionWrapper from "./pages/dashboard/DashboardTransitionWrapper";
import ItemsPage from "./pages/items/ItemsPage";

function LocationProvider({ children }: { children: ReactNode }) {
  return <AnimatePresence>{children}</AnimatePresence>;
}

function RoutesWithAnimation() {
  const location = useLocation();

  return (
    <AnimatePresence initial={false} mode="wait">
      <Routes location={location} key={location.key}>
        <Route
          path="/"
          element={
            <DashboardTransitionWrapper>
              <Dashboard location={location} />
            </DashboardTransitionWrapper>
          }
        />
        <Route path="/settings" element={<Settings />} />
        <Route path="/items" element={<ItemsPage />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  const theme = useMemo(() => createTheme(themeSettings as ThemeOptions), []);

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Box width="100%" height="100%" padding="1rem 2rem 4rem 2rem">
            <Navbar />
            <LocationProvider>
              <RoutesWithAnimation />
            </LocationProvider>
          </Box>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
