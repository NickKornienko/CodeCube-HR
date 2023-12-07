import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Invoices from "./scenes/invoices";
import Approvals from "./scenes/approvals";
import Contacts from "./scenes/contacts";
import Bar from "./scenes/bar";
import Form from "./scenes/form";
import Line from "./scenes/line";
import Pie from "./scenes/pie";
import FAQ from "./scenes/faq";
import Geography from "./scenes/geography";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Organization from "./scenes/organization";
import Login from "./scenes/login";
import Register from "./scenes/register";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import SsoLink from "./scenes/sso_link";
import Account from "./scenes/account";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if the user is logged in (e.g., check local storage)
    const user = localStorage.getItem("user");
    setIsLoggedIn(!!user);
  }, []);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <div className="app">
            {isLoggedIn && <Sidebar isSidebar={isSidebar} />}
            <main className={isLoggedIn ? "content" : ""}>
              {isLoggedIn && <Topbar setIsSidebar={setIsSidebar} />}
              <Routes>
                <Route
                  path="/"
                  element={
                    isLoggedIn ? <Dashboard /> : <Navigate to="/login" />
                  }
                />
                <Route
                  path="/login"
                  element={
                    isLoggedIn ? (
                      <Navigate to="/" />
                    ) : (
                      <Login setIsLoggedIn={setIsLoggedIn} />
                    )
                  }
                />
                <Route path="/register" element={<Register />} />
                {isLoggedIn ? (
                  <>
                    <Route path="/organization" element={<Organization />} />
                    <Route path="/contacts" element={<Contacts />} />
                    <Route path="/invoices" element={<Invoices />} />
                    <Route path="/approvals" element={<Approvals />} />
                    <Route path="/form" element={<Form />} />
                    <Route path="/bar" element={<Bar />} />
                    <Route path="/pie" element={<Pie />} />
                    <Route path="/line" element={<Line />} />
                    <Route path="/faq" element={<FAQ />} />
                    <Route path="/geography" element={<Geography />} />
                    <Route path="/sso_link" element={<SsoLink />} />
                    <Route path="/account" element={<Account />} />
                  </>
                ) : (
                  <Route path="*" element={<Navigate to="/login" />} />
                )}
              </Routes>
            </main>
          </div>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </LocalizationProvider>
  );
}

export default App;
