import React, { useState } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import InputBase from "@mui/material/InputBase";
import Button from "@mui/material/Button";
import AuthService from "../../AuthService.js";

const Register = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // State for registration details
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleRegister = () => {
    AuthService.register(username, email, password)
      .then((response) => {
        console.log(response.data);
        setSuccessMsg("Registration successful. Please login.");
        setErrorMsg("");
      })
      .catch((error) => {
        console.error("Registration failed", error);
        setErrorMsg(
          error.response?.data?.message ||
            "Registration failed. Please try again."
        );
        setSuccessMsg("");
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
        {/* Title and Subtitle */}
        <Typography
          variant="h4"
          color={colors.primary[500]}
          fontWeight="bold"
          sx={{ m: "0 0 5px 0px" }}
        >
          Create Your Account
        </Typography>

        {/* Username Input */}
        <Box
          sx={{
            backgroundColor: colors.purpleAccent[200],
            borderRadius: "7px",
            width: "75%",
            mb: 1,
          }}
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
            onChange={(e) => setUsername(e.target.value)}
          />
        </Box>

        {/* Email Input */}
        <Box
          sx={{
            backgroundColor: colors.purpleAccent[200],
            borderRadius: "7px",
            width: "75%",
            mb: 1,
          }}
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
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Box>

        {/* Password Input */}
        <Box
          sx={{
            backgroundColor: colors.purpleAccent[200],
            borderRadius: "7px",
            width: "75%",
            mb: 1,
          }}
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
            onChange={(e) => setPassword(e.target.value)}
          />
        </Box>

        {/* Confirm Password Input */}
        <Box
          sx={{
            backgroundColor: colors.purpleAccent[200],
            borderRadius: "7px",
            width: "75%",
            mb: 4,
          }}
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
            placeholder="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          {/* Success Message */}
          {successMsg && (
            <Box
              sx={{
                backgroundColor: theme.palette.success.main, // Success message styling
                color: theme.palette.success.contrastText,
                borderRadius: "7px",
                width: "75%",
                padding: "10px",
                textAlign: "center",
                marginBottom: "20px",
              }}
            >
              <Typography>{successMsg}</Typography>
            </Box>
          )}
        </Box>

        {/* Error Message */}
        {errorMsg && (
          <Box
            sx={{
              backgroundColor: theme.palette.error.main, // Error message styling
              color: theme.palette.error.contrastText,
              borderRadius: "7px",
              width: "75%",
              padding: "10px",
              textAlign: "center",
              marginBottom: "20px",
            }}
          >
            <Typography>{errorMsg}</Typography>
          </Box>
        )}

        {/* Register Button */}
        <Button
          variant="contained"
          sx={{
            width: "50%", // Adjusted width for a smaller button
            height: "50px", // Adjusted height for a smaller button
            textTransform: "none",
            fontFamily: ["Inter"].join(","),
            fontSize: "13px",
            borderRadius: "7px",
            margin: "10px 0", // Added margin for spacing
          }}
          onClick={handleRegister}
        >
          Create Account
        </Button>
      </Box>
    </Box>
  );
};

export default Register;
