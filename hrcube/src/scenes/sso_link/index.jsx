import React, { useState, useEffect } from "react";
import AuthService from "../../AuthService.js";
import { GoogleLogin } from "react-google-login";
const GOOGLE_CLIENT_ID = require("./secrets.json").GOOGLE_CLIENT_ID;

const SsoLinkPage = () => {
  const [isLinked, setIsLinked] = useState(false);

  useEffect(() => {
    const checkLinkStatus = async () => {
      try {
        const response = await AuthService.isGoogleLinked();
        if (response.status === 200) {
          setIsLinked(response.data.isLinked);
        }
      } catch (error) {
        console.error("Error checking link status: ", error);
      }
    };

    checkLinkStatus();
  }, []);

  const handleSuccess = async (googleData) => {
    try {
      const response = await AuthService.linkGoogleAccount(googleData.tokenId);
      if (response.status === 200) {
        setIsLinked(true);
        alert("Google account linked successfully");
      }
    } catch (error) {
      console.error("Error linking Google account: ", error);
    }
  };

  const handleFailure = (error) => {
    console.error("Google SSO failed: ", error);
  };

  const handleUnlinkGoogle = async () => {
    try {
      const response = await AuthService.unlinkGoogleAccount();
      if (response.status === 200) {
        setIsLinked(false);
        alert("Google account unlinked successfully");
      }
    } catch (error) {
      console.error("Error unlinking Google account: ", error);
    }
  };

  return (
    <div>
      <h1>Google Account Link</h1>
      {isLinked ? (
        <button onClick={handleUnlinkGoogle}>Unlink Google Account</button>
      ) : (
        <GoogleLogin
          clientId={GOOGLE_CLIENT_ID}
          buttonText="Link Google Account"
          onSuccess={handleSuccess}
          onFailure={handleFailure}
          cookiePolicy={"single_host_origin"}
        />
      )}
    </div>
  );
};

export default SsoLinkPage;
