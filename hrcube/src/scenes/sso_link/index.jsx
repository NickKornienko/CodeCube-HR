import React, { useState, useEffect } from "react";
import AuthService from "../../AuthService.js";
import { GoogleLogin } from "react-google-login";
const GOOGLE_CLIENT_ID = require("./secrets.json").GOOGLE_CLIENT_ID;

const SsoLinkPage = () => {
  const [isLinked, setIsLinked] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkLinkStatus = async () => {
      setLoading(true);
      try {
        const response = await AuthService.isGoogleLinked();
        setIsLinked(response.data.isLinked);
      } catch (error) {
        console.error("Error checking link status: ", error);
      } finally {
        setLoading(false);
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

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Google Account Link</h1>
      {isLinked ? (
        <div>
          <p>Your account is linked with Google.</p>
          <button onClick={handleUnlinkGoogle}>Unlink Google Account</button>
        </div>
      ) : (
        <div>
          <p>Your account is not linked with Google.</p>
          <GoogleLogin
            clientId={GOOGLE_CLIENT_ID}
            buttonText="Link Google Account"
            onSuccess={handleSuccess}
            onFailure={handleFailure}
            cookiePolicy={"single_host_origin"}
          />
        </div>
      )}
    </div>
  );
};

export default SsoLinkPage;
