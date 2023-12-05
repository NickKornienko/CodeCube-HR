// logout/index.jsx
import React, { useEffect } from "react";
import AuthService from "../../AuthService.js";

const Logout = () => {
  useEffect(() => {
    AuthService.logout();
  }, []);

  return (
    <div className="logout-container">
      <p>Logging out...</p>
    </div>
  );
};

export default Logout;
