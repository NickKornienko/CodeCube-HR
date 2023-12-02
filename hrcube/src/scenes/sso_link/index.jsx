import React, { useState, useEffect, useCallback } from "react";
import AuthService from "../../AuthService.js";

const GOOGLE_CLIENT_ID = require("./secrets.json").GOOGLE_CLIENT_ID;

const SsoLinkPage = () => {
  const [isLinked, setIsLinked] = useState(false);
  const [loading, setLoading] = useState(true);
  const [googleScriptLoaded, setGoogleScriptLoaded] = useState(false);
  const [googleEmail, setGoogleEmail] = useState(null);

  // useCallback for initGoogleSignIn
  const initGoogleSignIn = useCallback(() => {
    window.google.accounts.id.initialize({
      client_id: GOOGLE_CLIENT_ID,
      callback: handleSignInResponse,
    });
  }, []); // No dependencies

  // useCallback for loadGoogleScript
  const loadGoogleScript = useCallback(() => {
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.onload = () => {
      setGoogleScriptLoaded(true);
      initGoogleSignIn();
    };
    document.body.appendChild(script);
  }, [initGoogleSignIn]); // initGoogleSignIn as a dependency

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
    <div>
      <h1>Google Account Link</h1>
      {isLinked ? (
        <div>
          <p>Your account is linked with Google.</p>
          {googleEmail && <p>Google Account Email: {googleEmail}</p>}
          <button onClick={handleUnlinkGoogle}>Unlink Google Account</button>
        </div>
      ) : (
        <div>
          <p>Your account is not linked with Google.</p>
          <button onClick={handleSignIn}>Link Google Account</button>
        </div>
      )}
    </div>
  );
};

export default SsoLinkPage;
