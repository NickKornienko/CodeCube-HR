import React, { useState } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme.js";
import InputBase from "@mui/material/InputBase";
import Button from "@mui/material/Button";
import KeyIcon from "@mui/icons-material/Key";
import ViewInArRoundedIcon from "@mui/icons-material/ViewInArRounded";
import AuthService from "../../AuthService.js";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // State for username and password
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    AuthService.login(username, password)
      .then((response) => {
        navigate("/");
        console.log("Login successful", response);
      })
      .catch((error) => {
        setError("Username or password is incorrect.");
        console.error("Login failed", error);
      });
  };

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.primary[500],
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          m: "0 0 20px 0px",
        }}
      >
        <ViewInArRoundedIcon sx={{ marginRight: 1 }} />
        <Typography
          variant="h3"
          color={colors.blueAccent[200]}
          fontWeight="bold"
        >
          HRCubicle
        </Typography>
      </Box>

      <Box
        mb={7}
        sx={{
          width: "400px",
          height: "50vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: colors.purpleAccent[500],
          borderRadius: "15px",
        }}
      >
        <Typography
          variant="h4"
          color={colors.primary[500]}
          fontWeight="bold"
          sx={{ m: "0 0 5px 0px" }}
        >
          Welcome to HRCubible
        </Typography>
        <Typography
          fontSize="10"
          color={colors.primary[500]}
          sx={{ m: "0 0 30px 0px" }}
        >
          Online cubicle for your HR needs
        </Typography>

        {/* Username Input */}
        <Box
          display="flex"
          backgroundColor={colors.purpleAccent[200]}
          borderRadius="7px"
          width="75%"
          height="10%"
          mb={1}
        >
          <InputBase
            sx={{
              ml: 2,
              flex: 1,
              color: colors.purpleAccent[900],
              "& .MuiInputBase-input": {
                color: colors.purpleAccent[900],
              },
            }}
            placeholder="Username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              setError("");
            }}
          />
        </Box>

        {/* Password Input */}
        <Box
          display="flex"
          backgroundColor={colors.purpleAccent[200]}
          borderRadius="7px"
          width="75%"
          height="10%"
          mb={4}
        >
          <InputBase
            sx={{
              ml: 2,
              flex: 1,
              color: colors.purpleAccent[900],
              "& .MuiInputBase-input": {
                color: colors.purpleAccent[900],
              },
            }}
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError("");
            }}
          />
        </Box>

        {/* Login Button */}
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          backgroundColor={colors.purpleAccent[200]}
          borderRadius="7px"
          width="75%"
          height="10%"
          mb={4}
        >
          <Button
            variant="contained"
            sx={{
              width: "100%",
              height: "100%",
              textTransform: "none",
              fontFamily: ["Inter"].join(","),
              fontSize: "13px",
              borderRadius: "7px",
            }}
            onClick={handleLogin}
          >
            Login
          </Button>
        </Box>

        {/* SSO Button */}
        <Button
          endIcon={<KeyIcon />}
          sx={{
            textTransform: "none",
            justifyContent: "flex-start",
          }}
        >
          or login with SSO
        </Button>

        {/* Error Message Display */}
        {error && (
          <Box
            sx={{
              backgroundColor: theme.palette.error.main, // or any color you prefer
              color: theme.palette.error.contrastText,
              borderRadius: "7px",
              width: "75%",
              padding: "10px",
              textAlign: "center",
              marginBottom: "20px",
            }}
          >
            <Typography>{error}</Typography>
          </Box>
        )}

        {/* Link to Register */}
        <Typography variant="body2" color={colors.secondaryText}>
          Don't have an account?
          <Link
            to="/register"
            style={{ color: colors.link, textDecoration: "none" }}
          >
            Sign up
          </Link>
        </Typography>
      </Box>

      {/* Footer */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          m: "0 0 20px 0px",
        }}
      >
        <Typography fontSize="14px" color={colors.white}>
          Powered by CodeCube
        </Typography>
      </Box>
    </Box>
  );
};

export default Login;
