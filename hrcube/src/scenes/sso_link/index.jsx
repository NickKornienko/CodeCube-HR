import React, { useState, useEffect, useCallback } from "react";
import AuthService from "../../AuthService.js";
import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";

const GOOGLE_CLIENT_ID = require("../../secrets.json").GOOGLE_CLIENT_ID;

const SsoLinkPage = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isLinked, setIsLinked] = useState(false);
  const [loading, setLoading] = useState(true);
  const [googleScriptLoaded, setGoogleScriptLoaded] = useState(false);
  const [googleEmail, setGoogleEmail] = useState(null);

  const initGoogleSignIn = useCallback(() => {
    window.google.accounts.id.initialize({
      client_id: GOOGLE_CLIENT_ID,
      callback: handleSignInResponse,
    });
  }, []);

  const loadGoogleScript = useCallback(() => {
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.onload = () => {
      setGoogleScriptLoaded(true);
      initGoogleSignIn();
    };
    document.body.appendChild(script);
  }, [initGoogleSignIn]);

  useEffect(() => {
    const checkLinkStatus = async () => {
      setLoading(true);
      try {
        const response = await AuthService.isGoogleLinked();
        setIsLinked(response.data.isLinked);
        setGoogleEmail(response.data.email);
      } catch (error) {
        console.error("Error checking link status: ", error);
      } finally {
        setLoading(false);
      }
    };

    checkLinkStatus();
    loadGoogleScript();
  }, [loadGoogleScript]);

  const handleSignInResponse = async (googleResponse) => {
    try {
      const authServiceResponse = await AuthService.linkGoogleAccount(
        googleResponse.credential
      );
      if (authServiceResponse.status === 200) {
        setIsLinked(true);
        setGoogleEmail(authServiceResponse.data.email);
        alert("Google account linked successfully");
      }
    } catch (error) {
      console.error("Error linking Google account: ", error);
    }
  };

  const handleSignIn = () => {
    if (!googleScriptLoaded) {
      console.error("Google script not loaded yet");
      return;
    }
    window.google.accounts.id.prompt();
  };

  const handleUnlinkGoogle = async () => {
    try {
      const response = await AuthService.unlinkGoogleAccount();
      if (response.status === 200) {
        setIsLinked(false);
        setGoogleEmail(null);
        alert("Google account unlinked successfully");
      }
    } catch (error) {
      console.error("Error unlinking Google account: ", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start", // Align items to the start (left)
        justifyContent: "center",
        width: "100%", // Set width to full container width
        mt: 2, // Adjust top margin as needed
        mb: 2, // Adjust bottom margin as needed
      }}
    >
      <Typography variant="h6" color={colors.primary[500]} fontWeight="bold">
        Google Account Link
      </Typography>

      {isLinked ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            mt: 1,
          }}
        >
          <Typography variant="body1" color={colors.primary[500]}>
            Your account is linked with Google.
          </Typography>
          {googleEmail && <p>Google Account Email: {googleEmail}</p>}
          <button
            variant="contained"
            color={colors.primary[500]}
            type="submit"
            sx={{ mt: 1 }}
            onClick={handleUnlinkGoogle}
          >
            Unlink Google Account
          </button>
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            mt: 1,
          }}
        >
          <Typography variant="body1" color={colors.primary[500]}>
            Your account is not linked with Google.
          </Typography>
          <button
            variant="contained"
            color={colors.primary[500]}
            type="submit"
            sx={{ mt: 1 }}
            onClick={handleSignIn}
          >
            Link Google Account
          </button>
        </Box>
      )}
    </Box>
  );
};

export default SsoLinkPage;
